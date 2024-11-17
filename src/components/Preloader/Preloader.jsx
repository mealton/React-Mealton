import preloaderImg from "./preloader.gif";
import React from "react";

let Preloader = () => {
    return <img src={preloaderImg} alt="Подождите, идет загрузка..." className="img-fluid"/>
};

export default Preloader;