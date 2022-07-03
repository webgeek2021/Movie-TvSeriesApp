import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import "./contentModal.css";
import { image_500, unavailable, unavailableLandscape } from '../../config/config';
import { Button } from '@material-ui/core';
import YouTubeIcon from "@material-ui/icons/YouTube";
// import Carousel from "../Carousel/Carousel";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "black",
        color: "white",
        borderRadius: 10,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    },
}));

export default function ContentModal({ children, media, id }) {
    const classes = useStyles();
    const [content, setcontent] = React.useState()
    const [videoContent, setVideo] = React.useState()
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Dataapi = `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&external_source=imdb_id`

    const Videoapi = `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`

  
    const fetchData = async () => {
        const { data } = await axios.get(Dataapi);
        setcontent(data)
    }
    const fetchVideo = async () => {
        const { data } = await axios.get(Videoapi);
        setVideo(data.results[0]?.key)
    }
    
    React.useEffect(() => {
        fetchData()
        fetchVideo()
    }, [])

    return (
        <div>
            <div type="button" className="content" onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (<div className={classes.paper}>
                        <div className='ContentModal'>
                            <img className="ContentModal__portrait" alt={content.name || content.title} src={content.poster_path ? `${image_500}/${content.poster_path}` : `${unavailable}`} />
                            <img
                                src={
                                    content.backdrop_path
                                        ? `${image_500}/${content.backdrop_path}`
                                        : unavailableLandscape
                                }
                                alt={content.name || content.title}
                                className="ContentModal__landscape"
                            />

                            <div className='ContentModal__about'>
                                <span className='ContentModal__title'>
                                    {
                                        content.name || content.title
                                    }(
                                    {
                                        (content.first_air_date || content.release_date || ".....").substring(0, 4)
                                    }
                                    )
                                </span>
                                {
                                    content.tagline && (
                                        <i className='tagline'>{content.tagline}</i>
                                    )
                                }
                                <span className='ContentModal__description'>{content.overview} </span>
                                <div></div>
                                <Button
                                    variant="contained"
                                    startIcon={<YouTubeIcon/>}
                                    color="secondary"
                                    target="_blank"
                                    href={`https://www.youtube.com/watch?v=${videoContent}`}
                                    className="button"
                                >
                                    Watch Trailer

                                </Button>
                            </div>
                        </div>
                    </div>)}
                </Fade>
            </Modal>
        </div>
    );
}
