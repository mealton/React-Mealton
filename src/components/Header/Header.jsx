import React from 'react';
import './Header.scss';
import menuIcon from "./menuIcon.png";
import {NavLink, useLocation} from "react-router-dom";

const Header = props => {

    let locations = useLocation();

    return (
        <header className="header wrapper" style={{color: locations.pathname !== "/" && "#000"}}>
            <div className="menu relative" id="mainMenu">
                <img src={menuIcon} alt="Иконка меню" className="menu-hidden xs-menu-icon"/>
                <div className="clearfix menu-content">
                    <NavLink to="/" className="menu-option float-right ">Главная</NavLink>
                    <NavLink to="/literature" className="menu-option float-right ">Литература</NavLink>
                    <NavLink to="/music" className="menu-option float-right ">Музыка</NavLink>
                    <NavLink to="/gallery" className="menu-option float-right ">Галерея</NavLink> 
                </div>
            </div>
        </header>
    );
};

export default Header;