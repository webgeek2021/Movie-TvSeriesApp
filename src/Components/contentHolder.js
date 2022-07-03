import React from "react";
import { image_300, unavailable } from "../config/config";
import ContentModal from "./ContentModal/contentModal";

function ContentHolder(props) {
    
    return (
        <ContentModal media = {props.type} id={props.id}>
            {/* <div className="content"> */}
                
                <img src={props.poster_path ?image_300 + props.poster_path : unavailable} className="contentimg" />

                <div className='content--info'>
                    <span className="title">{props.title}</span>
                    <div className='other--info'>

                        <span className='info'>     {props.release_date}</span>
                        <span className='info'>{props.type}</span>
                        <span className='info'>
                        {props.vote_average}</span>
                    </div>
                </div>

            {/* </div> */}
        </ContentModal>
    )
}

export default ContentHolder;