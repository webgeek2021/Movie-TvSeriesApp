import React from 'react'
import { image_original } from '../../config/config'
import PosterCard from './posterPage/posterCard'
import ContentModal from "../../Components/ContentModal/contentModal"
function HomeCard(props) {
    return (
        
            <div className='homeCard'>
                <img src={image_original + props.backdrop_path} className="backimg"/>
                <PosterCard
                    key={props.id}
                    id={props.id}
                    title={props.title}
                    media = {props.media}
                    overview = {props.overview}
                    media_type = {props.media_type}
                    release_date = {props.release_date}
                    vote_average = {props.vote_average}
                    poster_path = {props.poster_path} 
                />
            </div>
            
    )
}
export default HomeCard