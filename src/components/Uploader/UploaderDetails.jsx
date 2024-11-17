import React, {useEffect, useRef} from 'react';
import UploaderDetailsReduxForm from "./UploaderDetailsForm";
import {createPortal} from "react-dom";

const UploaderDetails = props => {

    let dialog = useRef();

    useEffect(() => {
        dialog.current.showModal();
        dialog.current.scrollTo(0, 0);
    }, []);

    let onSubmitForm = (formData) => {
        props.uploadImage({...formData, src: props.uploadImageSrc, albumId: props.albumId});
    };

    return createPortal(
        <dialog className="container" ref={dialog}>
            <i onClick={() => dialog.current.close()} className='fa fa-times close-modal-img'/>
            <div className="row">
                <div className="col-sm-6">
                    <img src={props.uploadImageSrc} className="img-fluid" alt=""/>
                </div>
                <div className="col-sm-6">
                    <UploaderDetailsReduxForm onSubmit={onSubmitForm} {...props}/>
                </div>
            </div>
        </dialog>,
        document.getElementById('modal-dialog')
    );
};

export default UploaderDetails;