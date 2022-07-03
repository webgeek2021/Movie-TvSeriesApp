import React from 'react'
import { image_original } from "../../../config/config"
import { YouTube } from '@material-ui/icons';
import './poster.css'
import { Button } from '@material-ui/core';
import YouTubeIcon from "@material-ui/icons/YouTube";
import axios from 'axios'
import ContentModal from "../../../Components/ContentModal/contentModal"
function PosterCard(props) {    
    const [videoContent, setVideo] = React.useState()

    const Videoapi = `https://api.themoviedb.org/3/${props.media}/${props.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`

    const fetchVideo = async () => {
        const { data } = await axios.get(Videoapi);
        setVideo(data.results[0]?.key)
    }

    React.useEffect(() => {
        fetchVideo()
    }, [])
    return (

        <div className="poster">
            <div className='poster--info'>
                <h2 className="title">{props.title}</h2>
                <p className='overview'>{props.overview}</p>
                <div className='other--info'>
                    <span className='media_type'>
                        <span className="other_info-span">Media Type </span> {props.media_type}
                    </span>
                    <span className='release_date'> <span className="other_info-span">Release Date </span> {props.release_date}</span>
                    <span className='release_date'>
                        <span className="other_info-span"> Votes  </span>{props.vote_average}</span>
                </div>
                <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${videoContent}`}
                    className="button"
                >
                    Watch Trailer

                </Button>
            </div>
            {/* <img src={image_original + props.poster_path} className="posterimg"/> */}
        </div>
        
    )
}

export default PosterCard