import React from 'react';
import CommentItem from "./CommentItem";

const CommentsArea = ({comments}) => {
    return (

        <section className="w-100 p-4" id="comments-area">
            <div className="row d-flex justify-content-center text-body">
                <div className="col-md-12 col-lg-10 col-xl-8">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="text-body mb-0">Комментарии:</h4>
                    </div>
                    {comments.map(item => <CommentItem key={item.commentId} item={item}/>)}
                </div>
            </div>
        </section>

    );
};

export default CommentsArea;