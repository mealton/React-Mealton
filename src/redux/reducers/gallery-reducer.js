import {api} from "../../api/api";
import {cookie} from "../../lib/lib";
import {reset} from 'redux-form';
import {
    RESET, SET_COMMENT_LOADING, SET_COMMENTS,
    SET_LIKE_LOADING,
    SET_LOADING,
    setCommentLoading, setComments,
    setLikeLoading,
    setLikes,
    setLoading,
    UPDATE_LIKES
} from "./common";

export const OFFSET_LEFT = "OFFSET_LEFT";
export const SET_ALBUMS = "SET_ALBUMS";
export const SET_IMAGES = "SET_IMAGES";
export const SET_IMAGE = "SET_IMAGE";
export const SET_NEW_IMAGE = "SET_NEW_IMAGE";
export const PRELOAD_IMAGE = "PRELOAD_IMAGE";
export const HASHTAG = "HASHTAG";
export const SHOW_MODAL = "SHOW_MODAL";
export const SHOW_ADD_SUB = "SHOW_ADD_SUB";
export const SET_NEW_SUBS = "SET_NEW_SUB";


let initialState = {
    top_nav: [],
    images: [],
    hashtagImages: [],
    albums: [],
    image: {comments: []},
    imageId: 0,
    albumId: 0,
    page: 1,
    total: 0,
    breadcrumbs: [],
    subs: [],
    limit: 90,
    preloading: false,
    localLoading: false,
    likeLoading: false,
    commentLoading: false,
    hashtags: [],
    similar: [],
    offsetLeft: 0,
    readyToUpload: false,
    uploadImageSrc: null,
    hashtag: null,
    showModal: false,
    showAddSub: false,
};

let galleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALBUMS:
            return {
                ...state,
                image: {comments: []},
                albums: action.albums,
                top_nav: [],
                images: [],
                hashtagImages: [],
                page: 1,
                hashtags: [],
                similar: [],
                readyToUpload: false,
                uploadImageSrc: null,
            };
        case RESET:
            return initialState;
        case OFFSET_LEFT:
            return {
                ...state,
                offsetLeft: action.offsetLeft,
            };
        case SHOW_MODAL:
            return {
                ...state,
                showModal: action.show,
            };
        case SET_IMAGES:
            return {
                ...state,
                image: {comments: []},
                page: action.images.page,
                images: action.images.items,
                albumId: action.images.albumId,
                total: action.images.total,
                breadcrumbs: action.images.breadcrumbs,
                subs: action.images.subs,
                hashtagImages: [],
                top_nav: [],
                hashtags: [],
                similar: [],
                readyToUpload: false,
                uploadImageSrc: null,
            };
        case SET_NEW_IMAGE:
            return {
                ...state,
                images: [action.image].concat(state.images),
                readyToUpload: false,
            };
        case SET_IMAGE:
            return {
                ...state,
                page: 1,
                images: [],
                hashtagImages: [],
                albumId: 0,
                total: 0,
                breadcrumbs: action.image.breadcrumbs,
                subs: [],
                imageId: action.image.image.id,
                image: {...action.image.image, comments: action.image.image.comments},
                hashtags: action.image.hashtags,
                similar: action.image.similar,
                top_nav: action.image.top_nav,
                offsetLeft: action.image.offsetLeft,
                readyToUpload: false,
                uploadImageSrc: null,
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
        case UPDATE_LIKES:
            return {
                ...state,
                image: {...state.image, likes: action.likes}
            };
        case SET_COMMENTS:
            return {
                ...state,
                image: {...state.image, comments: action.comments},
            };
        case PRELOAD_IMAGE:
            return {
                ...state,
                readyToUpload: true,
                uploadImageSrc: action.src
            };
        case HASHTAG:
            return {
                ...state,
                image: {comments: []},
                page: 1,
                images: [],
                hashtagImages: action.images,
                albumId: 0,
                total: 0,
                breadcrumbs: [],
                subs: [],
                top_nav: [],
                hashtags: [],
                similar: [],
                readyToUpload: false,
                uploadImageSrc: null,
                hashtag: decodeURI(action.hashtag)
            };
        case SHOW_ADD_SUB:
            return {
                ...state,
                showAddSub: action.showAddSub
            };
        case SET_NEW_SUBS:
            return {
                ...state,
                subs: action.subs
            }
        default:
            return state;
    }
};

export let setImages = (images) => ({type: SET_IMAGES, images});
export let showModal = show => ({type: SHOW_MODAL, show});
export let setHashtagImages = (images, hashtag) => ({type: HASHTAG, images, hashtag});
export let setNewImage = (image) => ({type: SET_NEW_IMAGE, image});
export let setPreloadImage = (src) => ({type: PRELOAD_IMAGE, src});
export let setOffsetLeft = (offsetLeft) => ({type: OFFSET_LEFT, offsetLeft});
export let setImage = (image) => ({type: SET_IMAGE, image});
export let setAlbums = (albums) => ({type: SET_ALBUMS, albums});
export let setShowAddSub = (showAddSub) => ({type: SHOW_ADD_SUB, showAddSub});
export let setSNewSubs = (subs) => ({type: SET_NEW_SUBS, subs});


export let getAlbums = () => {
    return dispatch => {
        dispatch(setLoading(true));
        return api.gallery.getAlbums().then(data => {
            //console.log(data);
            dispatch(setLoading(false));
            dispatch(setAlbums(data.items));
            document.title = "Галерея";
        });
    }
};
export let getImages = (albumId, page = 1, limit = 10) => {
    return dispatch => {
        dispatch(setLoading(true));
        return api.gallery.getImages(albumId, page, limit).then(data => {
            //console.log(data);
            dispatch(setLoading(false));
            dispatch(setImages(data));
            document.title = data.album || data.breadcrumbs[0].title;
        });
    }
};
export let getImage = (id) => {
    return dispatch => {
        api.gallery.updateViews(id).then((data) => {
            console.log(data)
            dispatch(setLoading(true));
            return api.gallery.getImage(id).then(data => {
                console.log(data);
                dispatch(setLoading(false));

                let imgWidth = 186;
                let gridGap = 10;
                let position = +data.image.current_position;
                let leftInitial = 0 - ((position - 1) * (imgWidth + gridGap) + gridGap);

                if (position > data.top_nav.length - 5)
                    leftInitial = 0 - ((position - (position - data.top_nav.length + 6)) * (imgWidth + gridGap) + gridGap);

                data.offsetLeft = leftInitial;
                // data.offsetLeft = 0 - ((+action.image.image.current_position - 1) * (186 + 10) + 10);

                dispatch(setImage(data));
                document.title = data.image.title || "Галерея";
            });
        });


    }
};
export let updateLikes = imageId => dispatch => {
    dispatch(setLikeLoading(true));
    let dislike = cookie.get(`liked-image-${imageId}`);
    return api.gallery.updateLikes(imageId, dislike).then(data => {
        dispatch(setLikeLoading(false));
        if (data.likes) {
            dispatch(setLikes(data.likes));
            if (dislike)
                cookie.delete(`liked-image-${imageId}`);
            else
                cookie.set(`liked-image-${imageId}`, 1);
        }
    });
};
export let addComment = comment => dispatch => {
    dispatch(setCommentLoading(true));
    return api.gallery.setComment(comment).then(data => {
        dispatch(setCommentLoading(false));
        dispatch(setComments(data));
        dispatch(reset('commentForm'));
    });
};
export let uploadImage = image => dispatch => {
    dispatch(setCommentLoading(true));
    return api.gallery.uploadImage(image).then(data => {
        dispatch(setCommentLoading(false));
        dispatch(setNewImage(data));
        dispatch(reset('uploaderDetailsForm'));
    });
};
export let getHashtagImages = (hashtag) => {
    return dispatch => {
        dispatch(setLoading(true));
        return api.gallery.getHahtagImages(hashtag).then(data => {
            console.log(data);
            dispatch(setLoading(false));
            dispatch(setHashtagImages(data, hashtag));
            document.title = `#${decodeURI(hashtag)}`;
        });
    }
};
export let modal = show => dispatch => dispatch(showModal(show));

export let addSub = (title, parent) => dispatch => {
    dispatch(setCommentLoading(true));
    return api.gallery.addSub(title, parent).then(data => {
        dispatch(setCommentLoading(false));
        if (data.result){
            dispatch(setShowAddSub(false));
            dispatch(setSNewSubs(data.subs));
        }
    });
};

export default galleryReducer;