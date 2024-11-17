import React from 'react';
import Content from './Content/Content';

const Main = props => {
    return (
        <main className="main text-center container">
            <h1 className="main__title">Выберите подходящий тарифный план</h1>
            <Content store={props.store} data={props.data}/>
        </main>
    );
};


export default Main;