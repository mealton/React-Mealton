import React from 'react';
import FormItem from "./FormItem/FormItem";
import Checkbox from "./Checkbox/Checkbox";
import './Form.css';

function validate(e) {
    e.preventDefault();
    let form = e.target;
    if (!form.elements.agree.checked)
        return alert("Вы должны согласиться с Правилами сервиса и условиями Публичной оферты.");
    form.submit();
}

const Form = props => {

    let popularItems = props.data.filter(item => item.isPopular);
    let extraData = [
        {discount: "-30%", slogan: 'Чтобы просто начать 👍🏻', oldPrice: 999, sloganMobile: 'Чтобы просто начать 👍🏻'},
        {
            discount: "-40%",
            slogan: 'Привести тело впорядок 💪🏻',
            oldPrice: 1690,
            sloganMobile: 'Привести тело впорядок 💪🏻'
        },
        {discount: "-50%", slogan: 'Изменить образ жизни 🔥', oldPrice: 5990, sloganMobile: 'Изменить образ жизни 🔥'},
        {
            discount: "-70%",
            slogan: 'Всегда быть в форме и поддерживать своё здоровье ⭐',
            sloganMobile: 'Всегда быть в форме ⭐',
            oldPrice: 18990
        },
    ];
    popularItems = popularItems.map((item, i) => Object.assign(item, extraData[i]));

    return (
        <form action="" method="post" onSubmit={validate} className="content__form">
            <div className="content__body__item prices-top">
                {popularItems.map(item => <FormItem key={item.id} item={item}/>)}
            </div>
            <div className="content__body__item prices-bottom-text">
                <div className="prices-bottom-text__description">
                    Следуя плану на 3 месяца, люди получают в 2 раза лучший результат, чем за 1 месяц
                </div>
            </div>
            <div className="content__body__item prices-button">
                <Checkbox/>
                <button type="submit" className="btn prices-button__btn modal-clicker">Купить</button>
            </div>
        </form>
    );
};

export default Form;