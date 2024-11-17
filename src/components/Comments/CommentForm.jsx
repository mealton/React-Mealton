import React from "react";
import reduxForm from "redux-form/es/immutable/reduxForm";
import Field from "redux-form/es/Field";
import Input from "../FormElements/Input";
import {maxLengthCreator, required} from "../../utils/validators";
import Textarea from "../FormElements/Textarea";

let maxlength30 = maxLengthCreator(30);
let maxlength300 = maxLengthCreator(300);

const CommentForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="mb-3 field-item">
                <label htmlFor="name" className="form-label">Ваше имя</label>
                <Field className="form-control"
                       name="name"
                       validate={[required, maxlength30]}
                       component={Input}/>
            </div>
            <div className="mb-3">
                <label htmlFor="comment" className="form-label">Ваш комментарий</label>
                <Field className="form-control"
                       name="comment"
                       validate={[required, maxlength300]}
                       component={Textarea}/>
            </div>
            <button type="submit"
                    className={"btn btn-primary " + (props.commentLoading ? ' preloading' : '')}>Отправить
            </button>
        </form>
    );
};

let CommentReduxForm = reduxForm({
    form: 'commentForm'
})(CommentForm);

export default CommentReduxForm;