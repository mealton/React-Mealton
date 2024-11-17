import React from "react";
import "./Index.scss";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import backgroundImage from "./IndexPageBg.jpg"
import {getRandomInt} from "../../lib/lib";

const IndexPage = () => {

    const title = "Домашняя страничка Юрия Титова";

    const api_url = "https://api.mealton.ru/site/mainpage/";

    let [images, setImages] = useState([]);
    let [image, setImage] = useState(null);

    const startImage = useRef(null);
    const newImage = useRef(null);

    const imagePath = api_url + "images/";

    useEffect(() => {

        //Запрос на все картинки
        axios.get(api_url)
            .then(response => {
                setImages(response.data);
            });


        document.title = title;

        //СМена картинок в цикле
        let loop = setInterval(() => {
            let randomNumber = getRandomInt(0, images.length - 1);
            let randomImage = images[randomNumber];

            setImage(randomImage);

            if(randomImage){
                newImage.current.classList.add('loading');
            }
        }, getRandomInt(15000, 20000));

        let timeout = setTimeout(() => {
            if (image) {
                startImage.current.style.backgroundImage = `url("${imagePath + image}")`;
                newImage.current.classList.remove('loading');
                newImage.current.style.backgroundImage = `url("")`
            }
        }, 4000);

        return function cleanup() {
            console.log("cleaning up");
            clearInterval(loop);
            clearTimeout(timeout);
        };

    }, [image]);

    return (
        <>
            <div ref={startImage} id="startImage" style={{backgroundImage: `url("${backgroundImage}")`}}>
                <div ref={newImage} className="newImage" style={{backgroundImage: `url("${imagePath + image}")`}}/>
                <div id="filter"/>
            </div>
            <div className="mainTitle">
                <h1>{title}</h1>
            </div>
        </>
    );
};

export default IndexPage;