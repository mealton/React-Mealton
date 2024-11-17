import React, {useEffect, useRef, useState} from 'react';
import {createPortal} from "react-dom";
import {NavLink} from "react-router-dom";
import parse from "html-react-parser";
import {cookie} from "../../../lib/lib";
import {reduxForm} from "redux-form";
import Field from "redux-form/es/Field";
import {required} from "../../../utils/validators";
import Input from "../../FormElements/Input";

const LyricForm = props => {

    let dialog = useRef();
    let dialogCloseBtn = useRef();
    let textarea = useRef();

    let [text, setText] = useState(String(props.lyric.text));

    useEffect(() => {
        dialog.current.showModal();
        props.initialize({
            name: props.lyric.name
        });
        textarea.current.style.height = textarea.current.scrollHeight + 10 + "px";
    }, []);

    let onClose = () => {
        dialog.current.close();
        props.setLiteratureItem({});
    };


    let isLiked = +cookie.get(`liked-lyric-${props.lyric.id}`) === 1;

    return createPortal(
        <dialog className="lyric-dialog" ref={dialog}>
            <NavLink to={"/admin/?tab=literature"} ref={dialogCloseBtn} onClick={onClose}
                     className='fa fa-times close-modal-img'/>

            <div className={'dialog-body' + (props.preloading ? ' preloading' : '')}>
                <p className="text-center border-bottom pb-1"><b>{props.lyric.category}</b></p>
                <br/>

                <Field
                    name={"name"}
                    placeholder="Заголовок"
                    validate={[required]}
                    component={Input}
                    className={"form-control"}
                />

                <p className="text-end">
                    <i className='fa fa-eye'/>&nbsp;<small>{props.lyric.views}</small>&nbsp;&nbsp;
                    <i className='fa fa-comment-o'/>&nbsp;<small>{props.lyric.comments.length}</small>&nbsp;&nbsp;
                    <i className={`fa fa-heart${!isLiked ? "-o" : ""} cursor-pointer`}/>&nbsp;{props.lyric.likes}
                </p>

                <textarea
                    className={"form-control"}
                    name={"text"}
                    placeholder="Текст"
                    ref={textarea}
                    onChange={e => setText(e.target.value)}
                    value={text.replace(/<br\/?>/gi, "\n")}
                />

                {props.lyric.attachment ?
                    <audio style={{marginTop: '30px'}} controls
                           src={"https://mealton.ru/" + props.lyric.attachment}/> : ""}
                <h6 className="item date text-end"><small>{props.lyric.date}</small></h6>
            </div>
        </dialog>,
        document.getElementById('modal-dialog')
    );
};

let LyricReduxForm = reduxForm({form: 'lyricForm'})(LyricForm);
let Lyric = props => <LyricReduxForm {...props} />;

export default Lyric;