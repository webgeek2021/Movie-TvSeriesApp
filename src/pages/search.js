import React from 'react'
import axios from 'axios';
import ContentHolder from '../Components/contentHolder';
import CustomPagination from '../Components/Custompagination';
function Search(){

    const [type,setType] = React.useState("movie");
    const [Search,setSearch] = React.useState("")
    const [page,setpage] = React.useState(1)
    const [search_item  , setSearchItem] = React.useState([])
    const [numOfpage,setnumOfPages] = React.useState()

    const api = `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${Search}&page=${page}&include_adult=false`

    function handleChange(event)
    {
        event.preventDefault()
        const src = event.target.value;
        console.log(src)
        setSearch(src)
    }

    function handlebtn(event){
        event.preventDefault()
        const t = event.target.textContent
        t === "Movies" ? setType("movie") : setType("tv")
        fetchData() 
        // setSearch("")
    }
    console.log(type)
    const fetchData = async() => {
        const { data } = await axios.get(api)
        setSearchItem(data.results)
        setnumOfPages(data.total_pages)
    }
    
    console.log(search_item)
    React.useEffect(()=>{
        window.scroll(0,0);
        fetchData()
    },[type,page])
    const contentCard = search_item.map((item)=>{
        return(
            <ContentHolder
                key={item.id}
                id={item.id}
                title = {type==="movie" ? item.title : item.name}
                release_date = {type==="movie" ? item.release_date : item.first_air_date}
                vote_average = {item.vote_average}
                poster_path = {item.poster_path}
                type={type}
            />
        )
    })
   
    const empty = ()=>{

    }
    return (
        <div className='page'>
            <div className='form'>
            <form >
                <input
                 type="text"
                 placeholder='Search'
                 onChange={handleChange}
                 name="search"
                 value={Search}

                />
                <div className='form--btn'>
                <button onClick={handlebtn}>Movies</button>
                <button onClick={handlebtn} >Tv Series</button>
                </div>
            </form>
            </div>
            <div className='searchcontentContainer'>
                {search_item.length>=1 ? contentCard : <div className='error'>Nothing To display!</div>}
                {search_item.length>=1 ? <CustomPagination setPage= {setpage} total_pages = {numOfpage}/> : ""}
            </div>
            
        </div>
    )
}

export default Search