import React from 'react';
import Form from './Form/Form.jsx';
import Image from '../../../assets/img/to_be_2_card_2.jpg';

const Content = props => {
    return (
        <div className="content main__body">
            <div className="content__image image">
                <div className="image__wrapper">
                    <img src={Image} alt="" className="img-fluid content__image__img"/>
                </div>
            </div>
            <div className="content__body">
                <Form store={props.store} data={props.data}/>
                <div className="content__body__item bottom-text">
                    Нажимая «Купить», Пользователь соглашается на автоматическое списание денежных средств по
                    истечению купленного периода. Дальнейшие списания по тарифам участвующим в акции осуществляются
                    по полной стоимости согласно оферте.
                </div>
            </div>
        </div>
    );
};

export default Content;