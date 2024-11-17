import React from 'react';
import {NavLink} from "react-router-dom";
import "./_AlbumItem.scss";

const AlbumItem = props => {
    return (
        <div className="album" style={{backgroundImage: `url('${props.item.image}')`}}>
            <NavLink to={props.item.uri}>
                <div className="display-flex center flex-direction-column">
                    <strong>{props.item.name}</strong>
                    <span>{props.item.images_count}</span>
                </div>
            </NavLink>
        </div>
    );
};

export default AlbumItem;