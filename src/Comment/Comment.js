import React from 'react';
import comment_photo from "../res/profile-comment.jpg";
import './Comment.css'

function Comment(props) {
    return (
        <div className="postedCommentContainer">
            <img className="postedCommentPhoto" src={comment_photo}></img>
            <textarea value={props.comment} readOnly className="postedCommentInput" ></textarea>
        </div>
    );
}

export default Comment