import React from 'react'
import ContentHolder from '../../Components/contentHolder';
import Navbar from "../../Components/Navbar";
import CustomPagination from '../../Components/Custompagination';
import axios from 'axios'
import Genres from '../../Components/genres';
import useGenres from '../../hooks/useGenres';
function Movie(){

    const [fetchMovie , setMovie] = React.useState([]);
    const [page,setPage] = React.useState(1);
    const [numberOfPages , setnumberOfpages] = React.useState(1);
    const [selectedGenres , setselectedGenres ] = React.useState([]);

    const [genres,setgenres] = React.useState([]);
    const genresUrl = useGenres(selectedGenres)


    const  api = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresUrl}`
    
    
    const fetchData  = async () => {
            const { data } = await axios.get(api)
            setMovie(data.results)
            setnumberOfpages(data.total_pages)
    }

    React.useEffect( ()=>{
        fetchData()
    },[page,selectedGenres])
    
    const contentCard = fetchMovie.map((item)=>{
        
        return(
            
            <ContentHolder
            key={item.id}
            id={item.id}
            title={item.title}
            release_date = {item.release_date}
            vote_average = {item.vote_average}
            poster_path = {item.poster_path}
            type="movie"
            />
            
        )
    })
    console.log(contentCard)
    return(
        <div className='page'>
            <div className='pageTitle '>Movies</div>

            <Genres
                type = "movie"
                genres = {genres}
                selectedGenres = {selectedGenres}
                setselectedGenres = {setselectedGenres}
                setgenres = {setgenres}
                setPage = {setPage}
                
            />
        {fetchMovie.length >= 1 ?
            <div className='contentContainer'>
            {contentCard }
            <CustomPagination setPage= {setPage} total_pages = {numberOfPages}/> 
            </div>
            :
            <div className='error'>Nothing To display!</div>
        }   
        </div>
    )
}

export default Movie;