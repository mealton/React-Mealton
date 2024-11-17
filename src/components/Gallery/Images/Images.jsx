import React, {useEffect, useRef, useState} from 'react';
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import Subs from "../Subs/Subs";
import {NavLink} from "react-router-dom";
import "./_Images.scss";
import Pagination from "../../Pagination/Pagination";
import Uploader from "../../Uploader/Uploader";

const Images = props => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumbs breadrumbs={props.breadcrumbs}/>
                    <Uploader {...props}/>
                    <Subs {...props}/>
                </div>
            </div>
            <br/>
            <div className={"row gallery gg-container " + (props.preloading ? ' preloading' : '')}>
                {props.images.map(item => {
                    return (
                        <div className="col-md-2 col-sm-4 col-xs-6 thumb" key={item.id}>
                            <NavLink to={item.id} className="gallery">
                                <img className="img-responsive gallery-item" title={item.description}
                                     src={item.image} id={"gal_" + item.id} alt={item.description}/>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
            <div className="row">
                <div className="col">
                    <Pagination {...props} />
                </div>
            </div>
        </div>
    );
};

export default Images;