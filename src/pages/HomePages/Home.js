import React from "react"
import HomeCard from './HomeCard'
import item from './datasheet'
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import axios from "axios";
import ContentHolder from '../../Components/contentHolder'
import data from './datasheet'
// 8df66a7cb7fc5970969d0ec84150c7d4
function Home() {
    const [home, setHome] = React.useState([]);

    const api = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    // use trending api here
    const fetchData = async ()=>{
        const {data} = await axios.get(api)
        setHome(data.results)
    }
    React.useEffect(()=>{
        fetchData()
    },[new Date()])
    const windowWidth = window.innerWidth
    const cards  = home.map((data) => {
        return (
            <HomeCard
                key={data.id}
                id={data.id}
                media={data.media_type}
                title={data.title}
                original_lang={data.original_language}
                overview={data.overview}
                poster_path={data.poster_path}
                backdrop_path={data.backdrop_path}
                vote_average={data.vote_average}
                release_date={data.release_date}
            />
        )
    })

    
    const contentCard = home.map((item)=>{
        return(
            <ContentHolder
            key={item.id}
            id={item.id}
            title={item.title}
            release_date = {item.release_date}
            vote_average = {item.vote_average}
            poster_path = {item.poster_path}
            type={item.media_type}
            />
        )
    })
  
    return (
        <>
        
       {windowWidth >= 1000 ? 
        <div className='homeContainer'>
        <Carousel infiniteLoop axis="horizontal"  stopOnHover = {true} showThumbs={false} showIndicators={false}>
          {cards}
      </Carousel>
      </div>
      :
      <div className="page">
      <div className='contentContainer'>
            {contentCard}
            </div>
    </div>
        }
        
        </> 
    )
}

export default Home