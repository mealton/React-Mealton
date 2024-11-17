import React from 'react';
import {NavLink} from "react-router-dom";

const ImageNav = props => {
    return (
        <>
            {props.image.previous
                ? <NavLink to={`/gallery/album-${props.image.album_id}/${props.image.previous}`}
                           className="fa_wrap_left hidden-item" id="show_prev">
                    <span className="in2_left">
                        <i className="fa fa-chevron-left " aria-hidden="true" id="to_prev"/>
                    </span>
                </NavLink> : ""}

            {props.image.next
                ? <NavLink to={`/gallery/album-${props.image.album_id}/${props.image.next}`}
                           className="fa_wrap_right" id="show_next">
                    <span className="in2_right">
                        <i className="fa fa-chevron-right " aria-hidden="true" id="to_next"/>
                    </span>
                </NavLink> : ""}
        </>
    );
};

export default ImageNav;