import React from 'react';

const Select = ({input, meta, ...props}) => {
    let isInvalid = meta.touched && meta.error;
    return (
        <>
            <select {...input} {...props}
                    className={"form-select " + (isInvalid ? "is-invalid" : "")}>
                {props.options?.map(item => {
                    return <option key={item.value}
                                   value={item.value}>
                        {item.label || item.value}
                    </option>
                })}
            </select>
            <div className="invalid-feedback">{isInvalid && meta.error}</div>
        </>);
};

export default Select;