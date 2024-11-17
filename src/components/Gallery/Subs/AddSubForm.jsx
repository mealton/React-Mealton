import React, {useEffect, useRef} from 'react';
import {createPortal} from "react-dom";
import Field from "redux-form/es/Field";
import {maxLengthCreator, required} from "../../../utils/validators";
import Input from "../../FormElements/Input";
import reduxForm from "redux-form/es/immutable/reduxForm";

let maxlength100 = maxLengthCreator(100);

const AddSubForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="mb-3 field-item">
                <label htmlFor="sub" className="form-label">Название подпапки</label>
                <Field className="form-control"
                       name="title"
                       id={"sub"}
                       autoFocus={false}
                       placeholder={"Название подпапки"}
                       validate={[required, maxlength100]}
                       component={Input}/>
            </div>
            <button type="submit"
                    className={"btn btn-primary " + (props.commentLoading ? ' preloading' : '')}>
                Добавить подпапку
            </button>
        </form>
    );
};

let AddSubReduxForm = reduxForm({
    form: 'addSubForm'
})(AddSubForm);

const AddSub = props => {
    let dialog = useRef();

    useEffect(() => {
        dialog.current.showModal();
    }, []);

    let onSubmitForm = (formData) => {
        let title = formData.title;
        let parent = +props.albumId;

        if (title && parent)
            props.addSub(title, parent)
    };

    let dialogOnClose = () => {
        dialog.current.close();
        props.setShowAddSub(false);
    };

    return createPortal(
        <dialog className="container" ref={dialog}>
            <i onClick={dialogOnClose} className='fa fa-times position-absolute close-modal-img'/>
            <AddSubReduxForm onSubmit={onSubmitForm} {...props}/>
        </dialog>,
        document.getElementById('modal-dialog')
    );
};

export default AddSub;