import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    addComment,
    getLyric,
    getLyrics,
    updateLikes
} from "../../redux/reducers/literature-reducer";
import {reset} from "../../redux/reducers/common";
import Lyrics from "./../../components/Literature/Lyrics";
import 'bootstrap/dist/css/bootstrap.css';
import Lyric from "../../components/Literature/Lyric";
import {useLocation} from "react-router";

let LiteratureAll = (props) => {

    let location = useLocation();
    let lyricId = +location.pathname.trim().split("/").pop().replace(/[^\d]/gi, '');

    useEffect(() => {
        document.body.classList.remove('overflow-hidden');
        props.getLyrics();
        if (lyricId){
            props.getLyric(lyricId);
            document.body.classList.add('overflow-hidden');
        }

    }, [lyricId]);

    return (
        <div className="container">
            {props.lyricId ? <Lyric {...props}/> : false}
            <div className={"wrapper lyric-body " + (props.preloading ? ' preloading' : '')}>
                <Lyrics {...props}/>
            </div>
        </div>
    )
};


let mapStateToProps = (state) => ({
    lyrics: state.literature.lyrics,
    lyric: state.literature.lyric,
    lyricId: state.literature.lyricId,
    preloading: state.literature.preloading,
    likeLoading: state.literature.likeLoading,
    commentLoading: state.literature.commentLoading,
    comment: state.literature.comment,
});

let mapDispatchToProps = (dispatch) => ({
    getLyric: (lyricId) => dispatch(getLyric(lyricId)),
    getLyrics: () => dispatch(getLyrics()),
    reset: () => dispatch(reset()),
    updateLikes: (lyricId) => dispatch(updateLikes(lyricId)),
    addComment: (comment) => dispatch(addComment(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiteratureAll);