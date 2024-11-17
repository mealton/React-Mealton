import React from 'react';
import {connect} from "react-redux";
import {
    checkAuth, deleteImage,
    galleryInit,
    galleryItem, getLyric, getLyrics,
    login, resetImage,
    setGalleryItem, setImgToUpload, setLiteratureItem, setStatus,
    updateImage
} from "../../redux/reducers/admin-reducer";
import Login from "../../components/Admin/Login";
import Admin from "../../components/Admin/Admin";

const AdminPage = props => {
    props.checkAuth();
    return (
        <div className={"container mb-5" + (props.preloading ? ' preloading' : '')}>
            {props.auth ? <Admin {...props}/> : <Login {...props}/>}
        </div>
    );
};

let mapStateToProps = (state) => ({
    auth: state.admin.auth,
    __error: state.admin.__error,
    preloading: state.admin.preloading,

    //Gallery
    galleryAlbums: state.admin.gallery.albums,
    galleryAlbumImages: state.admin.gallery.images,
    galleryAlbumImage: state.admin.gallery.image,
    imgToUpload: state.admin.gallery.imgToUpload,
    //pagination
    total: state.admin.gallery.total,
    page: state.admin.gallery.page,
    limit: state.admin.gallery.limit,
    link: `?tab=gallery&albumId=${state.admin.gallery.albumId}&page=`,

    //Literature
    lyrics: state.admin.literature.lyrics,
    lyric: state.admin.literature.lyric,
    lyricId: state.admin.literature.lyricId,
});
let mapDispatchToProps = ({
    checkAuth,
    login,
    galleryInit,
    galleryItem,
    updateImage,
    setStatus,
    deleteImage,
    setImgToUpload,
    resetImage,

    getLyrics,
    getLyric,
    setLiteratureItem,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);