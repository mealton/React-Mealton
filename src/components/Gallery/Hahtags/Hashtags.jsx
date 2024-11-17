import React from 'react';
import {NavLink} from "react-router-dom";
import "./_Hashtags.scss";

const Hashtags = ({hashtags}) => {
    return (<div className="hashtags">
        <ul className="faq-tagslist visible" id="hashtags">
            {hashtags.map(item => {
                return <li key={item.hashtag_id}>
                    <NavLink to={`/gallery?hashtag=${item.hashtag}`} title="">{item.hashtag}&nbsp;
                        <sup>{item.count}</sup></NavLink>
                </li>;
            })}
        </ul>
    </div>);
};

export default Hashtags;