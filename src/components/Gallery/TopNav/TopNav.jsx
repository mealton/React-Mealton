import React, {useEffect, useRef, useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import "./_TopNav.scss";

const TopNav = ({items, album_id, offsetLeft, setOffsetLeft}) => {

    let topNavContainer = useRef();
    let imgWidth = 186;
    let gridGap = 10;

    function scrollAlbumImages(event) {
        event.preventDefault();
        let elementsCount = topNavContainer.current.querySelectorAll(".album-navigation__item").length;
        let offsetLeftMax = (elementsCount - 5) * (imgWidth + gridGap);
        let offsetLeft = parseInt(topNavContainer.current?.style.left);
        let newLeft = event.deltaY < 0
            ? offsetLeft + (imgWidth + gridGap)
            : offsetLeft - (imgWidth + gridGap);

        if ((newLeft > 0 && event.deltaY < 0) || (Math.abs(newLeft) > offsetLeftMax &&  event.deltaY > 0))
            return false;

        setOffsetLeft(newLeft);
    }

    let {pathname} = useLocation();
    let imageId = pathname.split('/').pop();

    useEffect(() => {

        topNavContainer.current?.addEventListener('mouseenter', () => {
            window.addEventListener('wheel', scrollAlbumImages, {passive: false});
        });
        topNavContainer.current?.addEventListener('mouseleave', () => window.removeEventListener('wheel', scrollAlbumImages));

        return function cleanup() {
            topNavContainer.current?.addEventListener('mouseleave', () => window.removeEventListener('wheel', scrollAlbumImages));
        };

    }, []);


    return (
        <div className="album-navigation mb-4">
            <div ref={topNavContainer} className="album-navigation__container"
                 style={{
                     gridGap: `${gridGap}px`,
                     gridTemplateColumns: `repeat(${items.length}, ${imgWidth}px)`,
                     left: `${offsetLeft}px`
                 }}>
                {items.map(item => {
                    return (
                        <NavLink key={item.id} to={`/gallery/album-${album_id}/${item.id}`}>
                            <img src={item.image} title={item.title} alt="#"
                                 className={"album-navigation__item " + (imageId === item.id ? "is_current" : "")}
                                 data-id={item.src}/>
                        </NavLink>
                    );
                })}

            </div>
        </div>
    );
};

export default TopNav;


