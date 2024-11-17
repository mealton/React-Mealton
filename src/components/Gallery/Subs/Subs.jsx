import React from 'react';
import imgFolder from './folder-icon.jpg'
import {NavLink} from "react-router-dom";
import "./_Subs.scss";
import AddSub from "./AddSubForm";

const Subs = (props) => {
    return (
        <div className="sub-controls">
            <div className="subs">
                {props.subs.map(item => {
                    return (
                        <NavLink key={item.id} to={"/gallery/" + item.uri}>
                            <div className="sub sub-item">
                                <div className="sub-img-counter">{item.img_count}<br/>фото</div>
                                <img src={imgFolder} alt="" width="140"/>
                                <b>{item.title}</b>
                            </div>
                        </NavLink>
                    );
                })}
                <a title="Добавить подпапку" onClick={() => props.setShowAddSub(true)}>
                    <div className="sub sub-item add-sub-button">
                        <img src={imgFolder} alt="" width="140"/>
                        <i className="fa fa-plus-circle" aria-hidden="true"/>
                    </div>
                </a>
            </div>
            {props.showAddSub && <AddSub {...props}/>}
        </div>
    );
};

export default Subs;