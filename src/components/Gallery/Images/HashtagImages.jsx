import React from 'react';
import {NavLink} from "react-router-dom";
import "./_Images.scss";

const HashtagImages = props => {
    return (
        <div className={"container" + (props.preloading ? ' preloading' : '')}>
            <h2 className={"mb-4"}>Изображения с пометкой <span style={{color: "blue"}}>#{props.hashtag}</span></h2>


            {props.hashtagImages.map((item, i, items) => {
                return (
                    <div key={i}>
                        <h6>{item.label}</h6>
                        <div className={"row gallery gg-container "}>
                            {item.items.map(item => {
                                return (
                                    <div className="col-md-2 col-sm-4 col-xs-6 thumb" key={item.id}>
                                        <NavLink to={`/gallery/album-${item.album_id}/${item.id}`}
                                                 target={"_blank"}
                                                 className="gallery">
                                            <img className="img-responsive gallery-item" title={item.title}
                                                 src={item.image} id={"gal_" + item.id} alt={item.title}/>
                                        </NavLink>
                                    </div>
                                )
                            })}
                        </div>
                        {i < items.length - 1 && <>
                            <hr/>
                            <br/>
                        </>}
                    </div>
                );
            })}

        </div>
    );
};

export default HashtagImages;