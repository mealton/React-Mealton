import React, {useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {queryStringToData} from "../../lib/lib";
import _Gallery from "./Gallery/_Gallery";
import _Literature from "./Literature/_Literature";
import _Music from "./Music/_Music";
import "./_Admin.scss";

const Admin = props => {

    let location = useLocation();
    let query = location.search;
    let currentTab = queryStringToData(query).tab;

    let [tab, setTab] = useState(currentTab || "literature");

    let nav = [
        {tab: "literature", label: "Литература"},
        {tab: "music", label: "Музыка"},
        {tab: "gallery", label: "Галлерея"},
    ];

    return (
        <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {nav.map((item, i) => {
                    return (
                        <li className="nav-item" key={i}>
                            <NavLink to={"?tab=" + item.tab}>
                                <button
                                    onClick={() => setTab(item.tab)}
                                    className={"nav-link" + (tab === item.tab ? " active" : "")}>
                                    {item.label}
                                </button>
                            </NavLink>
                        </li>)
                })}
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className={"tab-pane fade" + (tab === "literature" ? " show active" : "")}>
                    {tab === "literature" && <_Literature {...props}/>}
                </div>
                <div className={"tab-pane fade" + (tab === "music" ? " show active" : "")}>
                    {tab === "music" && <_Music {...props}/>}
                </div>
                <div className={"tab-pane fade" + (tab === "gallery" ? " show active" : "")}>
                    {tab === "gallery" && <_Gallery {...props}/>}
                </div>
            </div>
        </>
    );
};

export default Admin;