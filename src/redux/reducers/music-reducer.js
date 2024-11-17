import {api} from "../../api/api";
import {
    SET_COMMENT_LOADING,
    SET_LIKE_LOADING,
    SET_LOADING,
    setLikeLoading,
    setLoading,
} from "./common";
import {cookie} from "../../lib/lib";

export const SET_MUSIC = "SET_MUSIC";
export const SET_MUSIC_ITEM = "SET_MUSIC_ITEM";
export const SET_VOLUME = "SET_VOLUME";
export const SET_PLAY = "SET_PLAY";
export const SET_DURATION = "SET_DURATION";
export const SET_POSITION = "SET_POSITION";
export const SET_PROGRESS = "SET_PROGRESS";
export const SET_IS_LOADED = "SET_IS_LOADED";
export const SET_RADIO = "SET_RADIO";


let initialState = {
    music: [],
    musicItem: {},
    albumId: 0,
    isRadio: 0,
    musicId: 0,
    isPlaying: false,
    preloading: false,
    likeLoading: false,
    commentLoading: false,
    musicTitle: null,
    radioTitle: null,
    musicSrc: null,
    volume: 1,
    duration: 0,
    position: 0,
    progress: 0,
    isLoaded: true
};

let musicReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                preloading: action.preloading
            };
        case SET_LIKE_LOADING:
            return {
                ...state,
                likeLoading: action.likeLoading
            };
        case SET_RADIO:
            return {
                ...state,
                radioTitle: action.title
            };
        case SET_COMMENT_LOADING:
            return {
                ...state,
                commentLoading: action.commentLoading
            };
        case SET_MUSIC:
            return {
                ...state,
                music: action.music,
                albumId: action.albumId,
            };
        case SET_MUSIC_ITEM:
            return {
                ...state,
                musicId: action.item.id,
                musicSrc: action.item.src.match(/^https?/) ? action.item.src : "https://mealton.ru/" + action.item.src,
                musicTitle: action.item.title,
                musicNextId: action.item.next_id,
                isRadio: action.item.is_radio
            };
        case SET_PLAY:
            return {
                ...state,
                isPlaying: action.isPlaying,
            };
        case SET_VOLUME:
            return {
                ...state,
                volume: action.volume
            };
        case SET_DURATION:
            return {
                ...state,
                duration: action.duration
            };
        case SET_POSITION:
            return {
                ...state,
                position: action.position
            };
        case SET_PROGRESS:
            return {
                ...state,
                progress: action.progress
            };
        case SET_IS_LOADED:
            return {
                ...state,
                isLoaded: action.isLoaded
            };
        default:
            return state;
    }
};

export let setMusic = (music, albumId) => ({type: SET_MUSIC, music, albumId});
export let setMusicItem = (item) => ({type: SET_MUSIC_ITEM, item});
export let setVolume = (volume) => ({type: SET_VOLUME, volume});
export let setPlay = (isPlaying) => ({type: SET_PLAY, isPlaying});
export let setDuration = (duration) => ({type: SET_DURATION, duration});
export let setPosition = (position) => ({type: SET_POSITION, position});
export let setProgress = (progress) => ({type: SET_PROGRESS, progress});
export let setIsLoaded = (isLoaded) => ({type: SET_IS_LOADED, isLoaded});
export let setRadioTitle = (title) => ({type: SET_RADIO, title});


export let getMusic = (albumId) => {
    return dispatch => {
        dispatch(setLoading(true));
        return api.music.all(albumId).then(data => {
            console.log(data);
            dispatch(setLoading(false));
            dispatch(setMusic(data, albumId));
            document.title = "Музыка";
        });
    }
};
export let getMusicItem = (id, albumId) => {
    return dispatch => {
        dispatch(setLoading(true));
        return api.music.one(id, albumId).then(data => {
            dispatch(setLoading(false));
            dispatch(setMusicItem(data));
            document.title = data.title;
        });
    }
};
export let updateLikes = musicId => dispatch => {
    dispatch(setLikeLoading(musicId));
    let dislike = cookie.get(`liked-music-${musicId}`);
    return api.music.updateLikes(musicId, dislike).then(data => {
        //console.log(data);
        dispatch(setLikeLoading(false));
        if (data.result !== false) {
            dispatch(setMusic(data));
            if (dislike)
                cookie.delete(`liked-music-${musicId}`);
            else
                cookie.set(`liked-music-${musicId}`, 1);
        }
    });
};
export let getRadio = radio => dispatch => {
    return api.music.radio(radio).then(data => {
        console.log(data);
        if (data.title)
            dispatch(setRadioTitle(data.title));
    });
};


export default musicReducer;