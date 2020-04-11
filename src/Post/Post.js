import React from 'react';
import './Post.css'

import Comment from "../Comment/Comment"

import { connect } from 'react-redux';

import { post_comment, post_comment_mongo, fetch_user_profile_picture_name_mongo } from "../actions"
import { Spinner } from 'react-bootstrap';

const axios = require('axios');

function mapStateToProps(state) {
    return {
        messages: state.messages,
        message: state.message,
        comment: state.comment,
        username: state.username,
        pictureName: state.pictureName,

    };
}

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.commentOnChange = this.commentOnChange.bind(this);
        this.asyncPullPostersProfilePicture = this.asyncPullPostersProfilePicture.bind(this);

        //This is state ONLY needed for this component. Should not be pushing to Redux because it is inefficient 
        //(no other component needs to know what the user is typing - only what they ultimately typed)
        this.state = {
            commentTypedSoFar: "",
            posterProfile: null
        }
    }


    handleKeyPress(event) {
        var keyCode = event.charCode;

        if (keyCode === 13) {
            console.log("enter pressed on comment" + event.target.value + " " + this.props.key_index);

            //push the comment to redux
            this.props.dispatch(post_comment(this.state.commentTypedSoFar, this.props.key_index, this.props.username))

            this.props.dispatch(post_comment_mongo(this.state.commentTypedSoFar, this.props.key_index, this.props.username))

            this.setState({
                commentTypedSoFar: ""
            })

        }

    }

    commentOnChange(event) {
        this.setState({
            commentTypedSoFar: event.target.value
        })
    }

    generateComments(messages, indexToFind) {
        var comments = [];
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].key === indexToFind) {
                return messages[i].comments.map((comment, index) =>
                    <Comment key={index} comment={comment.comment} author={comment.author} />)
            }
        }
    }

    componentDidMount() {
       
        //get the poster's profile picture for the post.
        //This should NOT go through Redux because it is not something that all 
        //components need to know nor is it something that should be maintained
        //in the redux store. Instead, each post object needs to maintain this 
        //and make these calls on its own. 

        //set a timeout to make sure this is async and test functionality :) 
        setTimeout(this.asyncPullPostersProfilePicture, 1000);


    }

    asyncPullPostersProfilePicture() {
        console.log("$$ Making axios call in post to determine", this.props.author + "'s", "choice of profile picture")

        let querryUsername = {
            "username": this.props.author
        }

        axios.post("http://localhost:1080/user/profile/", querryUsername)
            .then((response) => {
                console.log(response);
                //dispatch(fetched_profile_picture(response.data))

                if (response.data.pictureName) {
                    this.setState({
                        posterProfile: response.data.pictureName
                    })

                }

            })
            .catch(function (error) {
                console.log(error);
                //dispatch(failed_to_fetch_profile_picture())
            })
    }





    render() {
        return (
            <div className="card-post">

                <div className="outerPostContainer">

                    {/* conditionally render the poster's profile picture if we've received it from MongoDB */}
                    {
                        this.state.posterProfile
                            ? <img src={require(`../res/userIcons/${this.state.posterProfile}`)} className="profilePost"></img>
                            : <Spinner animation="grow" />
                    }


                    <div className="innerPostContainer">
                        <p className="posterName">{this.props.author}</p>
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
                    <img className="commentPhoto" src={require(`../res/userIcons/${this.props.pictureName}`)}></img>
                    <textarea onKeyPress={this.handleKeyPress} onChange={this.commentOnChange}
                        placeholder={"write a comment..."}
                        className="commentInput"
                        value={this.state.commentTypedSoFar}></textarea>
                </div>


            </div>

        );
    }
}

export default connect(mapStateToProps, null)(Post);