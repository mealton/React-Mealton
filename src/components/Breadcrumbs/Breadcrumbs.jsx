import React from 'react';
import {NavLink} from "react-router-dom";
//import parse from "html-react-parser";
import {strip} from "../../lib/lib";
import "./breadcrumbs.css";

const Breadcrumbs = ({breadrumbs}) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/gallery">Галерея</NavLink></li>
                {breadrumbs.map(item => {
                    return (
                        item.active
                            ? <li key={item.id} className="breadcrumb-item active" aria-current="page">
                                {strip(item.title)}
                        </li>
                            : <li key={item.id} className="breadcrumb-item"><NavLink
                                to={`/gallery/album-${item.id}`}>{item.title}</NavLink></li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;