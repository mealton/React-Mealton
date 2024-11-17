import React from 'react';

const CommentItem = ({item}) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex flex-start">
                    <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-primary fw-bold mb-0">
                                {item.commentName}
                                <span className="text-body ms-2">{item.commentText}</span>
                            </h6>
                            <p className="mb-0">{item.commentDate}</p>
                        </div>
                    </div>
                </div>
                {item.commentImage?.preview &&
                <img src={item.commentImage?.preview}
                     style={{marginTop: '20px'}}
                     className="cursor-pointer"
                     onClick={() => window.open(item.commentImage.original)}
                     alt=""/>}
            </div>
        </div>
    );
};

export default CommentItem;