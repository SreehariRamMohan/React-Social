import React, { Text } from 'react';
import './Comment.css'

function Comment(props) {
    return (
        <div className="postedCommentContainer">
            <img className="postedCommentPhoto" src={require("../res/userIcons/profile11.png")}></img>
            <div readOnly className="postedCommentInput" ><span className="postedCommentName">{props.author}</span> <span>&nbsp;</span> {props.comment}</div>
        </div>
    );
}

export default Comment