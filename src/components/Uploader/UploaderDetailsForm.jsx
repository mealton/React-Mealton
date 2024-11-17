import React from 'react';
import Field from "redux-form/es/Field";
import {required} from "../../utils/validators";
import Input from "../FormElements/Input";
import Textarea from "../FormElements/Textarea";
import reduxForm from "redux-form/es/immutable/reduxForm";

const UploaderDetailsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="mb-3 field-item">
                <label htmlFor="description" className="form-label">Описание (обязательно к заполнению)</label>
                <Field className="form-control"
                       name="description"
                       id={"description"}
                       validate={[required]}
                       component={Textarea}/>
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Автор фото</label>
                <Field className="form-control"
                       id="author"
                       name="author"
                       component={Input}/>
            </div>
            <div className="mb-3">
                <label htmlFor="source" className="form-label">Источник изображения</label>
                <Field className="form-control"
                       id="source"
                       name="source"
                       component={Input}/>
            </div>
            <div className="mb-3">
                <label htmlFor="hashtags" className="form-label">Метки фото (хэштеги). Через запятую</label>
                <Field className="form-control"
                       id="hashtags"
                       name="hashtags"
                       component={Input}/>
            </div>
            <button type="submit"
                    className={"btn btn-primary " + (props.commentLoading ? ' preloading' : '')}>
                Загурзить изображение
            </button>
        </form>
    );
};

let UploaderDetailsReduxForm = reduxForm({
    form: 'uploaderDetailsForm'
})(UploaderDetailsForm);

export default UploaderDetailsReduxForm;