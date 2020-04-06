import React, {Text} from 'react';
import comment_photo from "../res/profile-comment.jpg";
import './Comment.css'

function Comment(props) {
    return (
        <div className="postedCommentContainer">
            <img className="postedCommentPhoto" src={comment_photo}></img>            
            <div readOnly className="postedCommentInput" ><span className="postedCommentName">Taara Rammohan</span> <span>&nbsp;</span> {props.comment}</div>
        </div>
    );
}

export default Comment