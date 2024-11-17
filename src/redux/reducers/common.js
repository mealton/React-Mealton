export const SET_LOADING = "SET_LOADING";
export const SET_COMMENT_LOADING = "SET_COMMENT_LOADING";
export const SET_LIKE_LOADING = "SET_LIKE_LOADING";
export const UPDATE_LIKES = "UPDATE_LIKES";
export const RESET = "RESET";
export const SET_COMMENTS = "SET_COMMENTS";

export let reset = () => ({type: RESET});
export let setLoading = (preloading) => ({type: SET_LOADING, preloading});
export let setLikeLoading = (likeLoading) => ({type: SET_LIKE_LOADING, likeLoading});
export let setLikes = likes => ({type: UPDATE_LIKES, likes});
export let setCommentLoading = (commentLoading) => ({type: SET_COMMENT_LOADING, commentLoading});
export let setComments = (comments) => ({type: SET_COMMENTS, comments});


