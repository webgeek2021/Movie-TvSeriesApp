import React from 'react'
import axios from 'axios'
import ContentHolder from '../../Components/contentHolder';
import CustomPagination from '../../Components/Custompagination';
import useGenres from '../../hooks/useGenres';
import Genres from '../../Components/genres';
function TVSeries(){
    const [TvSeries , settVSeries] = React.useState([])
    const [page,setpages] = React.useState(1);
    const [numOfpage,setnumOfPages] = React.useState(1)
    const [selectedGenres , setselectedGenres ] = React.useState([]);

    const [genres,setgenres] = React.useState([]);
    const genresUrl = useGenres(selectedGenres)
    const api = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_status=0&with_type=0&with_genres=${genresUrl}`

    const fetchData = async ()=>{
        const {data} = await axios.get(api)
        settVSeries(data.results)
        setnumOfPages(data.total_pages)
    }

    React.useEffect( ()=>{
        fetchData()
    },[page,selectedGenres])
    
    console.log(TvSeries.length)
    const contentCard = TvSeries.map((item)=>{
        return(
            <ContentHolder
            key={item.id}
            id={item.id}
            title={item.name}
            release_date = {item.first_air_date}
            vote_average = {item.vote_average}
            poster_path = {item.poster_path}
            type="tv"
            />
        )
    })


    return(
        <div className='page'>
            <div className="pageTitle">TV Show's</div>
            <Genres
                type = "tv"
                genres = {genres}
                selectedGenres = {selectedGenres}
                setselectedGenres = {setselectedGenres}
                setgenres = {setgenres}
                setPage = {setpages}
            />
            {TvSeries.length >= 1 ?
            <div className='contentContainer'>
                {contentCard}
                <CustomPagination setPage= {setpages} total_pages = {numOfpage}/>
            </div>
            :
            <div className='error'>Nothing To display!</div>
            }
            
        </div >
    )
}

export default TVSeries;