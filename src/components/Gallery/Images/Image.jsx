import React from 'react';
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import Hashtags from "../Hahtags/Hashtags";
import Similar from "../Similar/Similar";
import TopNav from "../TopNav/TopNav";
//import {NavLink} from "react-router-dom";
import "./_next_prev.scss";
//import CommentReduxForm from "../../Comments/CommentForm";
import CommentsArea from "../../Comments/CommentsArea";
import {cookie} from "../../../lib/lib";
import CommentReduxForm from "../../Comments/CommentForm";
import Modal from "./Modal/Modal";
import ImageNav from "./ImageNav";

const Image = props => {

    let onSubmitForm = (formData) => {
        props.addComment({
            commentId: props.image.id,
            commentName: formData.name.trim() || "Анонимный комментарий",
            commentText: formData.comment.trim(),
        });
    };

    let isLiked = +cookie.get(`liked-image-${props.image.id}`) === 1;
    return (
        <div className={"my-gallery container " + (props.preloading ? ' preloading' : '')}>
            <div className="one-image row">
                <TopNav items={props.top_nav}
                        album_id={props.image.album_id}
                        offsetLeft={props.offsetLeft}
                        setOffsetLeft={props.setOffsetLeft}
                />
                <Breadcrumbs breadrumbs={props.breadcrumbs}/>
                <h2 id="counter">{props.image.current_position}/{props.image.album_total}</h2>

                <p className="text-end">
                    <i className="fa fa-eye"/>&nbsp;<small>{props.image.views}</small>&nbsp;&nbsp;
                    {props.image.comments.length
                        ? <a href="#comments-area" style={{color: "inherit"}}><i className="fa fa-comment-o"/></a>
                        : <i className="fa fa-comment-o"/>}
                    &nbsp;<small>{props.image.comments.length}</small>&nbsp;&nbsp;
                    <i className={`fa fa-heart${!isLiked ? "-o" : ""} cursor-pointer` + (props.likeLoading ? ' preloading' : '')}
                       onClick={() => props.updateLikes(props.image.id)}
                    />&nbsp;{props.image.likes}
                </p>

                <div className="image-container">
                    <img src={props.image.src} alt="" id="image"
                         onClick={() => props.modal(true)}
                         className={"img-fluid cursor-pointer" + (props.preloading ? ' opacity-03' : '')}/>
                </div>
                <h6 id="source-image" className="text-end mt-2">
                    {props.image.author && <i><b>Автор:</b>&nbsp;{props.image.author}</i>}
                    {props.image.date && <i>&nbsp;&nbsp;{props.image.date}</i>}
                </h6>
                <br/>
                {props.hashtags[0]?.hashtag_id && <Hashtags hashtags={props.hashtags}/>}

                <hr/>
                {<CommentReduxForm onSubmit={onSubmitForm} commentLoading={props.commentLoading}/>}
                {props.image.comments.length ? <CommentsArea comments={props.image.comments}/> : ""}

            </div>

            {props.similar.length ? <Similar similar={props.similar}/> : ""}

            <ImageNav {...props}/>

            {props.showModal && <Modal {...props}/>}
        </div>
    );
};

export default Image;