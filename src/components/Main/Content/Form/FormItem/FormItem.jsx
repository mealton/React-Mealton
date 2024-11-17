import React from "react";
import './FormItem.css';
import $ from "jquery";

const FormItem = props => {
    let item = props.item;
    //console.log(item);
    return (
        <label className="prices-top__item data-item">
            <input type="radio" className="modal-item__input" name="choose" onChange={check}
                   value={`${item.name} со скидкой ${item.discount}`}/>
            <span className="data-item__discount">{item.discount}</span>
            <span className="data-item__name">{item.name}</span>
            <span className="data-item__price price">
                <span className="price__new">{item.price}&#8381;</span>
                <span className="data-item__oldprice">
                    <del>{item.oldPrice}&#8381;</del>
                </span>
            </span>
            <span className="data-item__slogan">{item.slogan}</span>
            <span className="data-item__slogan mobile">{item.sloganMobile}</span>
        </label>
    );
};

export default FormItem;

function check(e) {
    let input = e.target;
    let item = input.parentElement;
    $(item).closest("form").find('.data-item').removeClass('checked');
    if (input.checked)
        $(item).addClass("checked");
}