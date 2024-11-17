import React from "react";
import './Checkbox.css';

const Checkbox = props => {
    return (
        <div className="prices-button__checkbox checkbox">
            <input type="checkbox" name="agree" className="checkbox__input" id="agree"/>
            <label htmlFor="agree" className="checkbox__input-clone"/>
            <div className="checkbox__label">
                <label htmlFor="agree">Я соглашаюсь с</label>&nbsp;
                <a href="#" target="_blank" className="checkbox__label__link">Правилами сервиса</a>&nbsp;
                <label htmlFor="agree">и условиями</label>&nbsp;
                <a href="#" target="_blank" className="checkbox__label__link">Публичной оферты</a>.
            </div>
        </div>
    );
};

export default Checkbox;