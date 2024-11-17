import React, {useEffect, useRef} from 'react';
import {reduxForm} from "redux-form";
import {required} from "../../../utils/validators";
import Input from "../../FormElements/Input";
import Select from "../../FormElements/Select";
import Field from "redux-form/es/Field";
import _Uploader from "./_Uploader";
import {createPortal} from "react-dom";

const GalleryItemForm = props => {

    useEffect(() => {
        props.initialize({
            description: props.galleryAlbumImage.title,
            author: props.galleryAlbumImage.author,
            hashtags: props.galleryAlbumImage.hashtags,
            album: props.galleryAlbumImage.album_id,
            source: props.galleryAlbumImage.source,
        });
    }, []);

    let options = props.galleryAlbumImage.albums?.map(item => ({value: item.id, label: item.album}));

    return (
        <form onSubmit={props.handleSubmit} className="image-redactor">
            <img src={props.imgToUpload || props.galleryAlbumImage.src}
                 className={"img-fluid" + (props.galleryAlbumImage.status === "deleted" ? " opacity-25" : "")}
                 alt=""/>
            <hr/>

            <_Uploader {...props}/>


            <label htmlFor="select-album">Альбом</label>
            <Field className="form-control"
                   id="select-album"
                   name="album"
                   options={options}
                   validate={[required]}
                   component={Select}/>
            <br/>


            <label htmlFor="description">Описание изображения</label>
            <Field className="form-control"
                   id="description"
                   name="description"
                   placeholder={"Описание изображения"}
                   validate={[required]}
                   component={Input}/>
            <br/>
            <label htmlFor="author">Автор изображения</label>
            <Field className="form-control"
                   id="author"
                   name="author"
                   placeholder={"Автор изображения"}
                   validate={[required]}
                   component={Input}/>
            <br/>
            <label htmlFor="hashtags">Метки изображения</label>
            <Field className="form-control"
                   id="hashtags"
                   name="hashtags"
                   placeholder={"Метки изображения"}
                   component={Input}/>
            <br/>
            <label htmlFor="hashtags">Источник изображения</label>
            <Field className="form-control"
                   id="source"
                   name="source"
                   placeholder={"Источник изображения"}
                   component={Input}/>

            <br/>
            <button className="btn btn-primary mx-1" type="submit">Сохранить</button>
            {props.galleryAlbumImage.status === "deleted"
            && <>
                <button className="btn btn-success mx-1"
                        onClick={() => props.setStatus(props.galleryAlbumImage.id, "", props.page)}
                        type="button">Восстановить
                </button>
                <button className="btn btn-danger mx-1"
                        onClick={() => props.deleteImage(
                            props.galleryAlbumImage.id,
                            props.galleryAlbumImage.album_id,
                            props.page
                        )}
                        type="button">
                    Удалить окончательно
                </button>
            </>}
            {props.galleryAlbumImage.status !== "deleted"
            && <button className="btn btn-danger mx-1"
                       onClick={() => props.setStatus(props.galleryAlbumImage.id, "deleted", props.page)}
                       type="button">Удалить</button>}
            <button type="button" className="btn btn-secondary" onClick={() => props.resetImage()}>Закрыть</button>
        </form>
    );
};

let GalleryItemGalleryItemReduxForm = reduxForm({form: 'galleryItemForm'})(GalleryItemForm);

const _GalleryItem = props => {

    let dialog = useRef();

    let onClose = () => {
        dialog.current.close();
        props.resetImage();
    };

    useEffect(() => {
        dialog.current.showModal();
        //window.scrollTo(0, 0);
    }, []);

    return createPortal(
        <dialog ref={dialog}>
            <i onClick={onClose} className='fa fa-times close-modal-img'/>
            <GalleryItemGalleryItemReduxForm {...props}/>
        </dialog>,
        document.getElementById('modal-dialog')
    );
};
export default _GalleryItem;