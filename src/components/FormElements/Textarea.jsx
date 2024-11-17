import React from 'react';

const Textarea = ({input, meta, ...props}) => {
    let isInvalid  = meta.touched && meta.error;
    return (
        <>
            <textarea {...input} {...props} className={"form-control " + (isInvalid ? "is-invalid" : "")}/>
            <div className="invalid-feedback">{isInvalid && meta.error}</div>
        </>);
};

export default Textarea;