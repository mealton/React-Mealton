import React, {useEffect, useRef} from 'react';

const _Uploader = props => {

    let inputUploader = useRef();

    let uploadFile = (e) => {
        Object.values(e.target['files']).forEach(file => {
            let reader = new FileReader();
            reader.onload = () => props.setImgToUpload(reader.result);
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        inputUploader.current.addEventListener("paste", function (e) {
            if (e.clipboardData) {
                let items = e.clipboardData.items;
                if (items && !this.value) {
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].type.indexOf("image") !== -1) {
                            let blob = items[i].getAsFile();
                            let URLObj = window.URL || window.webkitURL;
                            let reader = new FileReader();
                            reader.readAsDataURL(blob);
                            reader.onloadend = () => {
                                props.setImgToUpload(reader.result);
                                e.clipboardData.clearData("Text");
                            };
                        }
                    }
                }
            }
        });
    });

    return (
        <>
            <div className="uploader mb-4">
                <input type="text" name="url" className="form-control" ref={inputUploader}
                       placeholder="Вставьте url, либо само изображение"/>

                <input onChange={uploadFile} type="file" name={"file"} id={"file"}/>
                <label htmlFor="file" className="d-block btn btn-primary fa fa-upload"/>
            </div>
        </>
    );
};

export default _Uploader;