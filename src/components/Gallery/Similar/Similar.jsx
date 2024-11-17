import React from 'react';
import {NavLink} from "react-router-dom";

const Similar = ({similar}) => {
    return (
        <div className="container d-block mt-4" id="similar">
            <h3><b>Похожие изображения:</b></h3>
            <div className="row gallery gg-container">

                {similar.map(item => {
                    return (
                        <div key={item.id} className="col-md-2 col-sm-4 col-xs-6 thumb">
                            <NavLink to={`/gallery/album-${item.album_id}/${item.id}`} className="gallery">
                                <img className="img-responsive gallery-item" title={item.title}
                                     src={item.src} id="gal_2160" alt=""/>
                            </NavLink>
                        </div>
                    )
                })}

            </div>
        </div>
    );
};

export default Similar;