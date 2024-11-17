import React, {useEffect} from 'react';
import {useLocation} from "react-router";
import {connect} from "react-redux";
import Player from "../../components/Music/Player/Player";
import {
    getMusic,
    getMusicItem, getRadio,
    setDuration, setIsLoaded,
    setPlay,
    setPosition,
    setProgress,
    setVolume,
    updateLikes
} from "../../redux/reducers/music-reducer";

const Music = props => {

    let location = useLocation();
    let pathname = location.pathname.trim().replace(/^\//gi, '').split("/");
    let album = pathname[1];
    let albumId = 0;
    if (album)
        albumId = +album.trim().split("-").pop();

    useEffect(() => {
        props.getMusic(albumId);
    }, [albumId]);

    return <Player {...props}/>;
};


let mapStateToProps = (state) => ({
    preloading: state.music.preloading,
    music: state.music.music,
    volume: state.music.volume,
    musicDuration: state.music.musicDuration,
    musicPosition: state.music.musicPosition,
    isRadio: state.music.isRadio,
    albumId: state.music.albumId,
    musicId: state.music.musicId,
    musicSrc: state.music.musicSrc,
    musicTitle: state.music.musicTitle,
    radioTitle: state.music.radioTitle,
    musicNextId: state.music.musicNextId,
    duration: state.music.duration,
    position: state.music.position,
    progress: state.music.progress,
    isPlaying: state.music.isPlaying,
    isLoaded: state.music.isLoaded,
    likeLoading: state.music.likeLoading,
});

let mapDispatchToProps = ({
    getMusic,
    setPlay,
    getMusicItem,
    setVolume,
    setDuration,
    setPosition,
    setProgress,
    setIsLoaded,
    updateLikes,
    getRadio,
});

export default connect(mapStateToProps, mapDispatchToProps)(Music);