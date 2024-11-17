import {NavLink} from "react-router-dom";
import React from "react";
import style from "./style/LiteratureAll.module.scss"

const Lyrics = ({lyrics}) => {

    return lyrics.map((item, i, items) => {
        return (
            <div key={i} className="lyric-content-item">
                <h6 className={style.h6}>{item.label}</h6>
                {item.items.map((lyric) => {
                    return (
                        <div key={lyric.id}>
                            {lyric.part && <h6 style={{marginTop: "35px"}}>{lyric.part}</h6>}
                            <p className={style.p}>
                                <NavLink to={"/literature/" + lyric.id}>{lyric.name}</NavLink>
                            </p>
                        </div>)
                })}
                {i < items.length - 1 && <>
                    <hr/>
                    <br/>
                </>}
            </div>
        );
    });
};

export default Lyrics;