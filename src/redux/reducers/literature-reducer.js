import {api} from "../../api/api";
import {cookie} from "../../lib/lib";
import {
    SET_COMMENT_LOADING, SET_LIKE_LOADING,
    SET_LOADING,
    setCommentLoading,
    setLikeLoading,
    setLikes,
    setLoading,
    UPDATE_LIKES
} from "./common";

export const SET_LYRICS = "SET_LYRICS";
export const SET_LYRIC = "SET_LYRIC";
export const RESET = "RESET_LYRIC";
export const SET_COMMENT = "SET_COMMENT";

let initialState = {
    lyrics: [],
    lyric: {},
    lyricId: 0,
    preloading: false,
    likeLoading: false,
    commentLoading: false,
    comment: {
        name: "",
        text: ""
    }
};

let literatureReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LIKES:
            return {
                ...state,
                lyric: {...state.lyric, likes: action.likes}
            };
        case SET_LYRICS:
            return {
                ...state,
                lyrics: action.lyrics.items
            };
        case SET_LYRIC:
            return {
                ...state,
                lyric: {...action.lyric},
                lyricId: action.lyric.id,
                comment: {
                    name: "",
                    text: ""
                }
            };
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
        case SET_COMMENT_LOADING:
            return {
                ...state,
                commentLoading: action.commentLoading
            };
        case RESET:
            return {
                ...state,
                lyricId: 0
            };
        case SET_COMMENT:
            return {
                ...state,
                lyric: {...state.lyric, comments: action.comments}
            };
        default:
            return state;
    }
};

export let setLyrics = (lyrics) => ({type: SET_LYRICS, lyrics});
export let setLyric = (lyric) => ({type: SET_LYRIC, lyric});


export let setComment = (comment) => ({type: SET_COMMENT, comment});

export let getLyrics = () => {
    return dispatch => {
        dispatch(setLoading(true));
        return api.literature.getAll().then(data => {
            //console.log(data);
            dispatch(setLoading(false));
            dispatch(setLyrics(data));
            document.title = "Литература";
        });
    }
};
export let getLyric = (lyricId) => {
    return dispatch => {
        api.literature.updateViews(lyricId).then(() => {
                dispatch(setLoading(true));
                return api.literature.getOne(lyricId).then(data => {
                    //console.log(data);
                    dispatch(setLoading(false));
                    dispatch(setLyric(data));
                    document.title = data.name;
                });
            }
        );

    }
};
export let updateLikes = (lyricId) => dispatch => {
    dispatch(setLikeLoading(true));
    let dislike = cookie.get(`liked-lyric-${lyricId}`);
    return api.literature.updateLikes(lyricId, dislike).then(data => {
        //console.log(data);
        dispatch(setLikeLoading(false));
        if (data.likes) {
            if (dislike)
                cookie.delete(`liked-lyric-${lyricId}`);
            else
                cookie.set(`liked-lyric-${lyricId}`, 1);

            dispatch(setLikes(data.likes));
        }

    });
};

export let addComment = (comment) => {
    return dispatch => {
        dispatch(setCommentLoading(true));
        return api.literature.setComment(comment).then(data => {
            console.log(data);
            dispatch(setCommentLoading(false));
            dispatch(setLyric(data));
        });
    }
};


export default literatureReducer;