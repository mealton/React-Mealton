import React from 'react';
import AlbumItem from "./AlbumItem";

const Albums = props => {
    return (<div className={"container text-center" + (props.preloading ? ' preloading' : '')}>
        <div className="my-gallery albums text-align-center">
            {props.albums.map(item => <AlbumItem key={item.id} item={item}/>)}
        </div>

    </div>);
};

export default Albums;