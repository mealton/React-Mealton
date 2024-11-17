import React from 'react';

const Input = ({input, meta, ...props}) => {
    let isInvalid  = meta.touched && meta.error;
    return (
        <>
            <input {...input} {...props} className={"form-control " + (isInvalid ? "is-invalid" : "")}/>
            <div className="invalid-feedback">{isInvalid && meta.error}</div>
        </>);
};

export default Input;