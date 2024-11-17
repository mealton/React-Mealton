import React, {useEffect} from 'react';
import style from "../../Literature/style/LiteratureAll.module.scss";
import {NavLink, useLocation} from "react-router-dom";
import {queryStringToData} from "../../../lib/lib";
import _Lyric from "./_Lyric";

const _Literature = props => {

    let location = useLocation();
    let query = location.search;
    let lyricId = queryStringToData(query).lyricId;

    useEffect(() => {
        props.getLyrics();
        if (lyricId)
            props.getLyric(lyricId);
    }, [lyricId, props.lyricId]);

    return (
        <div className={"container" + (props.preloading ? ' preloading' : '')}>
            {props.lyricId && <_Lyric {...props}/>}
            {props.lyrics?.map((item, i, items) => {
                return (
                    <div key={i} className="lyric-content-item">
                        <h6 className={style.h6}>{item.label}</h6>
                        {item.items.map((lyric) => {
                            return (
                                <div key={lyric.id}>
                                    {lyric.part && <h6 style={{marginTop: "35px"}}>{lyric.part}</h6>}
                                    <p className={style.p}>
                                        <NavLink to={"/admin?lyricId=" + lyric.id}>{lyric.name}</NavLink>
                                    </p>
                                </div>)
                        })}
                        {i < items.length - 1 && <>
                            <hr/>
                            <br/>
                        </>}
                    </div>
                );
            })}
        </div>);
};

export default _Literature;