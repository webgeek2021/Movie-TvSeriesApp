import { Chip } from '@material-ui/core';
import axios from 'axios';
import React from 'react';

function Genres(props){

    const api = `https://api.themoviedb.org/3/genre/${props.type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    const fetchGenres = async ()=>{
        const { data } = await axios.get(api)
        // console.log(data.genres)
        props.setgenres(data.genres)
    }
   
    React.useEffect(()=>{
        fetchGenres()
    },[])

    const handleAdd = (genre)=>{
        props.setselectedGenres([...props.selectedGenres,genre])
        props.setgenres(props.genres.filter((g)=> g.id !== genre.id))
        // props.setPage(1)
    }

    const handleRemove = (genre)=>{
        props.setselectedGenres(props.selectedGenres.filter((selected)=>selected.id !== genre.id ))
        props.setgenres([...props.genres,genre])

    }
    const styles = {
        display:"flex",
        justifyContent:"center",
        flexWrap:"wrap",
        fontWeight: 900
    }
    return(
        <div style={styles} >
            {props.selectedGenres && props.selectedGenres.map((genre)=>{
                return(<Chip
                    label={genre.name}
                    style={{margin:"4px"}}
                    size="medium"
                    color="primary"
                    key={genre.id}
                    clickable
                        onDelete={()=> handleRemove(genre)}
                />)
            })}

            {props.genres && props.genres.map((genre)=>{
                return(<Chip
                    label={genre.name}
                    style={{margin:"4px"}}
                    size="medium"
                    key={genre.id}
                    clickable
                        onClick = {()=>handleAdd(genre)}
                />)
            })}
        </div>
    )
}

export default Genres;