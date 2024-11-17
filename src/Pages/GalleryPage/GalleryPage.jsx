import React, {useEffect} from 'react';
import {useLocation} from "react-router";
import {
    addComment, addSub,
    getAlbums, getHashtagImages,
    getImage,
    getImages, modal,
    setOffsetLeft, setPreloadImage, setReadyToUpload, setShowAddSub,
    updateLikes, uploadImage
} from "../../redux/reducers/gallery-reducer";
import {connect} from "react-redux";
import Albums from "../../components/Gallery/Albums";
import {queryStringToData} from "../../lib/lib";
import Images from "../../components/Gallery/Images/Images";
import Image from "../../components/Gallery/Images/Image";
import HashtagImages from "../../components/Gallery/Images/HashtagImages";


const GalleryPage = props => {

    let location = useLocation();
    let pathname = location.pathname.trim().replace(/^\//gi, '').split("/");
    let query = location.search;
    let page = queryStringToData(query).page;
    let hashtag = queryStringToData(query).hashtag;
    let album = pathname[1];
    let albumId = 0;
    if (album)
        albumId = +album.trim().split("-").pop();
    let id = pathname[2];

    useEffect(() => {

        window.scrollTo(0, 0);

        if (id)
            props.getImage(id);
        else if (album)
            props.getImages(albumId, page ? page : props.page, props.limit);
        else if (hashtag)
            props.getHashtagImages(hashtag);
        else
            props.getAlbums();

    }, [id, albumId, page, hashtag]);

    if (id)
        return <Image {...props}/>;
    else if (album)
        return <Images {...props}/>;
    else if (hashtag)
        return <HashtagImages {...props}/>;
    else
        return <Albums {...props}/>;

};


let mapStateToProps = (state) => ({
    albumId: state.gallery.albumId,
    albums: state.gallery.albums,
    images: state.gallery.images,
    image: state.gallery.image,
    preloading: state.gallery.preloading,
    likeLoading: state.gallery.likeLoading,
    commentLoading: state.gallery.commentLoading,
    limit: state.gallery.limit,
    page: state.gallery.page,
    breadcrumbs: state.gallery.breadcrumbs,
    subs: state.gallery.subs,
    total: state.gallery.total,
    imageId: state.gallery.imageId,
    hashtags: state.gallery.hashtags,
    hashtag: state.gallery.hashtag,
    similar: state.gallery.similar,
    top_nav: state.gallery.top_nav,
    offsetLeft: state.gallery.offsetLeft,
    readyToUpload: state.gallery.readyToUpload,
    uploadImageSrc: state.gallery.uploadImageSrc,
    hashtagImages: state.gallery.hashtagImages,
    showModal: state.gallery.showModal,
    showAddSub: state.gallery.showAddSub
});

let mapDispatchToProps = (dispatch) => ({
    getAlbums: () => dispatch(getAlbums()),
    getImages: (albumId, page, limit) => dispatch(getImages(albumId, page, limit)),
    getImage: (id) => dispatch(getImage(id)),
    setOffsetLeft: (offsetLeft) => dispatch(setOffsetLeft(offsetLeft)),
    updateLikes: (id) => dispatch(updateLikes(id)),
    addComment: (comment) => dispatch(addComment(comment)),
    setPreloadImage: (src) => dispatch(setPreloadImage(src)),
    uploadImage: (image) => dispatch(uploadImage(image)),
    getHashtagImages: (hashtag) => dispatch(getHashtagImages(hashtag)),
    modal: (show) => dispatch(modal(show)),
    setShowAddSub: (showAddSub) => dispatch(setShowAddSub(showAddSub)),
    addSub: (title, parent) => dispatch(addSub(title, parent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage);