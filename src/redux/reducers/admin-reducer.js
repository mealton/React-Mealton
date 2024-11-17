import {api} from "../../api/api";
import {cookie} from "../../lib/lib";
import {stopSubmit} from "redux-form";
import {SET_LOADING, setLoading} from "./common";
import {setLyric} from "./literature-reducer";

export const SET_AUTH = "SET_AUTH";
export const SET_ERROR = "SET_ERROR";

export const SET_GALLERY_INIT = "SET_GALLERY_INIT";
export const SET_GALLERY_ITEM = "SET_GALLERY_ITEM";
export const SET_IMAGE_STATUS = "SET_IMAGE_STATUS";
export const SET_IMG_TO_UPLOAD = "SET_IMG_TO_UPLOAD";
export const RESET_IMAGE = "RESET_IMAGE";

export const SET_LITERATURE = "SET_LITERATURE";
export const SET_LITERATURE_ITEM = "SET_LITERATURE_ITEM";

let initialState = {
    auth: false,
    __error: "",
    preloading: false,
    gallery: {
        albums: [],
        images: [],
        image: {},
        albumId: 0,
        total: 0,
        limit: 60,
        page: 1,
        imgToUpload: null,
    },
    literature: {
        lyrics: [],
        lyric: {},
        lyricId: null,
    },
    music: {}
};

let adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                auth: action.auth
            };
        case SET_ERROR:
            return {
                ...state,
                __error: action.error
            };
        case SET_LOADING:
            return {
                ...state,
                preloading: action.preloading
            };
        case SET_GALLERY_INIT:
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    albums: action.data.albums,
                    images: action.data.images,
                    page: +action.data.page,
                    total: +action.data.total,
                    albumId: +action.data.albumId,

                }
            };
        case SET_GALLERY_ITEM:
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    image: action.image,
                }
            };
        case SET_IMAGE_STATUS:
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    image: {...state.image, status: action.status}
                }
            };
        case SET_IMG_TO_UPLOAD:
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    imgToUpload: action.base64
                }
            };
        case RESET_IMAGE:
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    imgToUpload: null,
                    image: {}
                }
            };

        case SET_LITERATURE:
            return {
                ...state,
                literature: {
                    ...state.literature,
                    lyrics: action.items
                }
            };
        case SET_LITERATURE_ITEM:
            return {
                ...state,
                literature: {
                    ...state.literature,
                    lyric: action.lyric,
                    lyricId: action.lyric.id,
                }
            };
        default:
            return state;
    }
};

//GALLERY
export let setAuth = (auth) => ({type: SET_AUTH, auth});
export let setError = (error) => ({type: SET_ERROR, error});
export let setGalleryInit = (data) => ({type: SET_GALLERY_INIT, data});
export let setGalleryItem = (image) => ({type: SET_GALLERY_ITEM, image});
export let setImageStatus = (status, id) => ({type: SET_IMAGE_STATUS, status, id});
export let setImgToUpload = (base64) => ({type: SET_IMG_TO_UPLOAD, base64});
export let resetImage = () => ({type: RESET_IMAGE});

//Thunk
export let checkAuth = () => {
    return dispatch => {
        let authId = cookie.get(`authId`) || sessionStorage.getItem(`authId`);
        return api.admin.auth(authId).then(data => {
            //console.log(data);
            dispatch(setAuth(data.auth));
            document.title = data.auth ? "Страница администратора" : "Авторизация";
        });
    }
};
export let login = (loginData) => {
    return dispatch => {
        return api.admin.login(loginData).then(data => {
            if (!data.auth) {
                dispatch(setError("Пользователь не найден..."));
                return dispatch(stopSubmit("loginForm", {_error: "Пользователь не найден..."}));
            }
            console.log(data);
            dispatch(setAuth(data.auth));
            if (loginData.rememberMe)
                cookie.set(`authId`, data.authId);
            else
                sessionStorage.setItem(`authId`, data.authId)
        });
    }
};
export let galleryInit = (albumId, page = 1) => {
    return dispatch => {
        dispatch(setLoading(true));
        return api.admin.gallery.init(albumId, page).then(data => {
            console.log(data);
            window.scrollTo(0, 0);
            dispatch(setLoading(false));
            dispatch(setGalleryInit(data));
        });
    }
};
export let galleryItem = (imageId) => {
    return dispatch => {
        dispatch(setLoading(true));
        return api.admin.gallery.getImage(imageId).then(data => {
            console.log(data);
            dispatch(setLoading(false));
            dispatch(setGalleryItem(data));
        });
    }
};
export let updateImage = (image) => dispatch => {
    dispatch(setLoading(true));
    return api.admin.gallery.updateImage(image).then(data => {
        console.log(data);
        dispatch(setLoading(false));
        if (data.images)
            dispatch(setGalleryInit(data));
    });
};
export let setStatus = (imageId, status, page) => dispatch => {
    dispatch(setLoading(true));
    return api.admin.gallery.setImageStatus(imageId, status, page).then(data => {
        console.log(data);
        dispatch(setLoading(false));
        if (data.status !== undefined) {
            dispatch(setImageStatus(data.status, imageId));
            dispatch(setGalleryInit(data.images));
        }

    });
};
export let deleteImage = (imageId, albumId, page) => dispatch => {
    dispatch(setLoading(true));
    return api.admin.gallery.delete(imageId, albumId, page).then(data => {
        console.log(data);
        dispatch(setLoading(false));
        if (data.result) {
            dispatch(setGalleryInit(data.images));
            dispatch(setGalleryItem({}));
        }
    });
};

//LITERATURE
export let setLiterature = items => ({type: SET_LITERATURE, items});
export let setLiteratureItem = lyric => ({type: SET_LITERATURE_ITEM, lyric});

export let getLyrics = () => {
    return dispatch => {
        dispatch(setLoading(true));
        return api.literature.getAll().then(data => {
            //console.log(data);
            dispatch(setLoading(false));
            dispatch(setLiterature(data.items));
        });
    }
};

export let getLyric = lyricId => dispatch => {
    return api.literature.getOne(lyricId).then(data => {
        console.log(data);
        dispatch(setLoading(false));
        dispatch(setLiteratureItem(data));
    });
};

export default adminReducer;