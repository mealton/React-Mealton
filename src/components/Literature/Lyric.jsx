import parse from 'html-react-parser'
import React, {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import "../../assets/css/_preloader.scss";
import "./style/Lyric.scss";
import {NavLink} from "react-router-dom";
import CommentReduxForm from "../Comments/CommentForm";
import CommentsArea from "../Comments/CommentsArea";
import {cookie} from "../../lib/lib";

const Lyric = ({
                   lyric,
                   reset,
                   updateLikes,
                   addComment,
                   likeLoading,
                   commentLoading,
                   preloading
               }) => {

    let dialog = useRef();
    let dialogCloseBtn = useRef();


    let onSubmitForm = (formData) => {
        addComment({
            commentId: lyric.id,
            commentName: formData.name.trim() || "Анонимный комментарий",
            commentText: formData.comment.trim(),
        });
    };


    useEffect(() => {
        dialog.current.showModal();
        dialog.current.scrollTo(0, 0);
        dialogCloseBtn.current.style.top = `${dialog.current.offsetTop + 15}px`;
    }, [lyric.name]);

    let onClose = () => {
        dialog.current.close();
        reset();
    };

    let isLiked = +cookie.get(`liked-lyric-${lyric.id}`) === 1;

    let previous = lyric.neighbors.prev_id
        ? <NavLink className='fa fa-angle-left cursor-pointer lyric-nav'
                   to={"/literature/" + lyric.neighbors.prev_id}
        /> : "";
    let next = lyric.neighbors.next_id
        ? <NavLink className='fa fa-angle-right cursor-pointer lyric-nav'
                   to={"/literature/" + lyric.neighbors.next_id}
        /> : "";

    return createPortal(
        <dialog className="lyric-dialog" ref={dialog}>
            <NavLink to={"/literature/"} ref={dialogCloseBtn} onClick={onClose}
                     className='fa fa-times close-modal-img'/>
            {previous}{next}
            <div className={'dialog-body' + (preloading ? ' preloading' : '')}>
                <p className="text-center border-bottom pb-1"><b>{lyric.category}</b></p>
                <br/>
                <h2>{lyric.name}</h2>
                <p className="text-end">
                    <i className='fa fa-eye'/>&nbsp;<small>{lyric.views}</small>&nbsp;&nbsp;
                    {+lyric.comments.length > 0 &&
                    <a href="#comments-area" style={{color: "inherit"}}>
                        <i className='fa fa-comment-o'/></a>}
                    {+lyric.comments.length === 0 && <i className='fa fa-comment-o'/>}
                    &nbsp;<small>{lyric.comments.length}</small>&nbsp;&nbsp;

                    <i className={`fa fa-heart${!isLiked ? "-o" : ""} cursor-pointer` + (likeLoading ? ' preloading' : '')}
                       onClick={() => updateLikes(lyric.id)}
                    />&nbsp;{lyric.likes}
                </p>
                <div className="item text-content text-justify">{parse(String(lyric.text))}</div>
                {lyric.attachment ?
                    <audio style={{marginTop: '30px'}} controls src={"https://mealton.ru/" + lyric.attachment}/> : ""}
                <h6 className="item date text-end"><small>{lyric.date}</small></h6>
                <hr/>
                <CommentReduxForm onSubmit={onSubmitForm} commentLoading={commentLoading}/>
                {lyric.comments.length ? <CommentsArea comments={lyric.comments}/> : ""}
            </div>
        </dialog>,
        document.getElementById('modal-dialog')
    );
};

export default Lyric;