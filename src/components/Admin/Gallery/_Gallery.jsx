import React, {useEffect, useState} from 'react';
//import {NavLink} from "react-router-dom";
import "./_Gallery.scss";
import _GalleryItem from "./_GalleryItem";
import {NavLink, useLocation} from "react-router-dom";
import {queryStringToData} from "../../../lib/lib";
import Pagination from "../../Pagination/Pagination";

const _Gallery = props => {

    let albums = props.galleryAlbums;
    let images = props.galleryAlbumImages;

    let location = useLocation();
    let query = location.search;
    let albumId = queryStringToData(query).albumId;
    let page = queryStringToData(query).page || 1;
    let id = queryStringToData(query).id;


     useEffect(() => {
        props.galleryInit(albumId, page);
         if(id)
             props.galleryItem(id);
    }, [albumId, page, id]);


    let onUpdate = formDara => props.updateImage({
        ...formDara,
        imageId: props.galleryAlbumImage.id,
        src: props.imgToUpload,
        page: props.page,
    });


    return (
        <>
            {props.galleryAlbumImage.id && <_GalleryItem onSubmit={onUpdate} {...props}/>}
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {albums.map((album, i) => {
                    return (
                        <li key={album.id} className={"nav-item" + (album.status === "deleted" ? " opacity-25" : "")}>
                            <button
                                className={"nav-link " + (album.id === albumId || (!albumId && i === 0) ? "active" : "")}>
                                <NavLink to={"?tab=gallery&albumId=" + album.id}>{album.title}</NavLink>
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className={"tab-pane fade show active"}>
                    <div className={"row gallery gg-container " + (props.preloading ? ' preloading' : '')}>
                        {images.map(item => {
                            return (
                                <div className="col-md-2 col-sm-4 col-xs-6 thumb admin-gallery-item"
                                     key={item.gallery_id}>
                                    {/*<NavLink
                                        to={`/admin?tab=gallery&albumId=${albumId}&page=${page}&id=${item.gallery_id}`}>*/}
                                        <img
                                            className={"img-responsive gallery-item" + (item.status === "deleted" ? " opacity-25" : "")}
                                            title={item.description}
                                            src={"https://mealton.ru/files/img/preview/" + item.src}
                                            onClick={() => props.galleryItem(item.gallery_id)}
                                            alt={item.description}/>
                                    {/*</NavLink>*/}
                                </div>
                            )
                        })}
                    </div>
                    <div className="row">
                        <div className="col">
                            <Pagination {...props} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default _Gallery;