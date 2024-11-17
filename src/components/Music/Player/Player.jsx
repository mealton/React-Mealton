import React, {useEffect, useRef, useState} from 'react';
import "./_Player.scss";
import playIcon from "./play.png"
import pauseIcon from "./pause.png"
import next from "./next.png"
import {cookie, timeConverter} from "../../../lib/lib";
import "../_Playlist.scss";
import {NavLink} from "react-router-dom";

const Player = props => {

    let playerRef = useRef();
    let audioRef = useRef();

    let play = () => {
        audioRef.current.play();
        props.setPlay(true);
        let intervalId = setInterval(() => {
            if (!audioRef.current)
                return clearInterval(intervalId);

            props.setPosition(audioRef.current.currentTime);
            props.setProgress(Math.round(audioRef.current?.currentTime / audioRef.current?.duration * 100));

            if (audioRef.current.paused)
                clearInterval(intervalId);
        }, 1000);
    };

    let pause = () => {
        audioRef.current.pause();
        props.setPlay(false);
        return true;
    };

    useEffect(() => {

        if (props.musicId)
            play();

        let player = playerRef.current;
        let playerWidth = player.offsetWidth;

        window.onscroll = () => {
            let scrollTop = window.pageYOffset;
            let playerOffsetLeft = player.offsetLeft;
            if (scrollTop >= 50) {
                player.style.position = "fixed";
                player.style.left = `${playerOffsetLeft}px`;
                player.style.top = `20px`;
                player.style.width = `${playerWidth}px`;
            } else
                player.style.position = "static";
        };

        return () => {
            window.onscroll = null;
        };

    }, []);

    let playingButton = () => props.isPlaying ? pause() : play();

    let clickToPosition = e => {
        let position = (e.screenX - e.target.getBoundingClientRect().left) / e.target.offsetWidth * props.duration;
        props.setPosition(position);
        props.setProgress(Math.round(position / props.duration * 100));
        audioRef.current.currentTime = position;
    };

    let audioOnLoad = e => {
        props.setIsLoaded(true);
        props.setDuration(e.target.duration);
    };
    let onChangeVolume = e => {
        props.setVolume(e.target.value);
        audioRef.current.volume = props.volume;
    };
    let playNext = () => {
        if (!props.musicNextId)
            return pause();

        props.getMusicItem(props.musicNextId, props.albumId);
        play();
    };

    let playTrack = id => {
        props.getMusicItem(id, props.albumId);
        play();
    };

    return (
        <div className={"container " + (props.preloading ? ' preloading' : '')}>
            <div className={"music"}>
                <div id="player" ref={playerRef}>
                    <audio
                        autoPlay={true}
                        src={props.musicSrc} ref={audioRef}
                        onLoadedData={audioOnLoad}
                        onEnded={playNext}
                    />
                    <div className="player">
                        <div className="wrapper-music" id="music">
                            <button id="play" style={{display: "flex"}} onClick={playingButton}>
                                <img src={props.isPlaying ? pauseIcon : playIcon} alt=""/>
                            </button>
                            <button>
                                <img src={next} onClick={playNext} alt=""/>
                            </button>
                            <div className="hp_slide" id="progress_bar" onClick={clickToPosition}>
                                <div className="hp_range handle" style={{width: `${props.progress}%`}}/>
                            </div>
                            <div className={"volume"}>
                                <output name="volumeValue" htmlFor="volume" id="volumeValue">
                                    {`Громкость: ${(props.volume * 100)}%`}
                                </output>
                                <input type="range" title="Громкость"
                                       onChange={onChangeVolume}
                                       value={props.volume}
                                       id="volume"
                                       name="volume"
                                       min=".1" max="1"
                                       step="0.1"/>
                            </div>
                            <div className={"time pointer" + (props.isLoaded ? "" : " preloading")}
                                 id="current_time"
                                 title="Нажмите, чтобы запустить обратный отсчет">
                                <span id="position">{timeConverter(props.position)}</span>
                                /
                                <span
                                    id="duration">{isFinite(props.duration) ? timeConverter(props.duration) : "99:99"}</span>
                            </div>
                            <p id="songTitleName">{props.musicTitle}</p>
                        </div>
                    </div>
                </div>
                {props.albumId !== 0 && <p><small><NavLink to={"/music"}>Отобразить все</NavLink></small></p>}
                <ul id="plList">
                    {props.music.map((item, i) => {
                        let isLiked = +cookie.get(`liked-music-${item.id}`) === 1;
                        return (
                            <li className={"plSel" + (item.id === props.musicId ? " active" : "")} key={item.id}>
                                <div className="plItem">
                                    <span className="plNum">{i < 9 ? `0${i + 1}` : (i + 1)}.</span>
                                    <span className="plTitle">
                                        <span onClick={() => playTrack(item.id)}>
                                            {item.title}
                                        </span>
                                        &nbsp;
                                        <sup>
                                            <NavLink to={`/music/${item.albumId}`}>
                                                {item.album}
                                            </NavLink>
                                        </sup>
                                    </span>
                                    <span className="plLength">{item.duration}</span>
                                    <span className="plLikes">
                                        <i className={`fa fa-heart${!isLiked ? "-o" : ""} cursor-pointer` +
                                        (props.likeLoading === item.id ? ' preloading' : '')}
                                           onClick={() => props.updateLikes(item.id)}
                                        />&nbsp;&nbsp;{item.likes}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};


export default Player;