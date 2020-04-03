import React from 'react';
import profile from '../res/profile.JPG'
import './Post.css'

import comment_photo from "../res/profile-comment.jpg";

import Comment from "../Comment/Comment"

import { connect } from 'react-redux';

import { post_comment, typed_comment, clear_comment } from "../actions"


function mapStateToProps(state) {
    return {
        messages: state.messages,
        message: state.message,
        comment: state.comment
    };
}

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.commentOnChange = this.commentOnChange.bind(this);
    }

    handleKeyPress(event) {
        var keyCode = event.charCode;

        if (keyCode === 13) {
            console.log("enter pressed on comment" + event.target.value + " " + this.props.key_index);

            //push the comment to redux
            this.props.dispatch(post_comment(event.target.value, this.props.key_index))

            //clear the comments currently being displayed
            this.props.dispatch(clear_comment(this.props.key_index));

        }

    }

    commentOnChange(event) {
        this.props.dispatch(typed_comment(event.target.value, this.props.key_index));
    }

    generateComments(messages, indexToFind) {
        var comments = [];
        for(var i = 0; i < messages.length; i++) {
            if(messages[i].key === indexToFind) {
                return messages[i].comments.map((comment, index) => 
                <Comment key={index} comment={comment}/>)
            }
        }
    }

    render() {
        return (
            <div className="card-post">

                <div className="outerPostContainer">

                    <img src={profile} className="profilePost"></img>

                    <div className="innerPostContainer">
                        <p className="posterName">Sreehari Rammohan</p>
                        <p className="posterDate">{this.props.date}</p>
                    </div>




                </div>


                <textarea
                    className="postedInput"
                    value={this.props.messageContent}
                    readOnly
                />

                <hr className="dividePostAndComments"></hr>

                {this.generateComments(this.props.messages, this.props.key_index)}

                <div className="commentContainer">
                    <img className="commentPhoto" src={comment_photo}></img>
                    <textarea onKeyPress={this.handleKeyPress} onChange={this.commentOnChange}
                        placeholder={"write a comment..." + this.props.key_index}
                        className="commentInput"
                        value={this.props.messages[this.props.key_index].comment}></textarea>
                </div>


            </div>

        );
    }
}

export default connect(mapStateToProps, null)(Post);