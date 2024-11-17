import React, {useRef, useState} from 'react';
import Draggable from 'react-draggable';

import zoomIn from './zoom.png';
import zoomOut from './zoomOut.png';
import "./_Modal.scss";
import ImageNav from "../ImageNav";

const Modal = props => {

    let [zoom, setZoom] = useState(false);
    let [imgResponsive, setImgResponsive] = useState(true);
    let [dragInit, setDragInit] = useState({left: 0, top: 0});
    let [showOtherImg, setShowOtherImg] = useState(null);
    let img = useRef();

    let zoomer = e => {
        let img = e.target;
        let width = +img.offsetWidth;
        let naturalWidth = +img.naturalWidth;
        setZoom(naturalWidth > width)
    };

    let imageFullSize = () => {
        if (!zoom)
            return false;
        setImgResponsive(!imgResponsive);
        img.current.style.left = 0;
        img.current.style.top = 0;
    };

    let draggingStart = e => {
        setDragInit({
            left: e.pageX - e.target.offsetLeft,
            top: e.pageY - e.target.offsetTop
        });
    };

    let draggingEnd = e => {
        if (imgResponsive && showOtherImg)
            return props.getImage(showOtherImg);
    };

    let draggingMove = e => {
        if (imgResponsive) {
            if (e.pageX && e.pageX < dragInit.left && Math.abs(e.pageX - dragInit.left) >= 100)
                return setShowOtherImg(props.image.next);
            else if (e.pageX && e.pageX > dragInit.left && Math.abs(dragInit.left - e.pageX) >= 100)
                return setShowOtherImg(props.image.previous);
            else
                return false;
        }
    };

    return (
        <div className="_modal hidden-modal" style={{display: "flex", opacity: 1}}>
            <i aria-current="page" onClick={() => props.modal(false)} className="fa fa-times close-modal"/>
            <div className="content">
                {zoom && <img src={imgResponsive ? zoomIn : zoomOut} alt="" onClick={imageFullSize} id="zoom"/>}
                <p id="modal-counter">{props.image.current_position}/{props.image.album_total}</p>
                <div className="description" id="modal_description">{props.image.title}</div>
                {imgResponsive && <img src={props.image.src}
                                       onLoad={zoomer}
                                       alt=""
                                       ref={img}
                                       onDragStart={draggingStart}
                                       onDrag={draggingMove}
                                       onDragEnd={draggingEnd}
                                       onDoubleClick={imageFullSize}
                                       className="img-fluid" id="modal_img"/>}
                {!imgResponsive && <Draggable>
                    <img src={props.image.src}
                         alt=""
                         ref={img}
                         onDoubleClick={imageFullSize}
                         id="modal_img"/>
                </Draggable>}

            </div>
            {imgResponsive && <ImageNav {...props}/>}
        </div>
    );
};

export default Modal;