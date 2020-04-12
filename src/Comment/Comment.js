import React from 'react';
import './Comment.css'

import { Spinner } from 'react-bootstrap';

const axios = require('axios');

class Comment extends React.Component {
    

    constructor(props) {
        super(props);

        this.state = {
            commentPhoto: null
        }

        this.asyncPullCommentersProfilePicture = this.asyncPullCommentersProfilePicture.bind(this);
    }

    componentDidMount() {

         //get the commenter's profile picture for the comment (the photo appears in the left hand side of each comment)
        //This should NOT go through Redux because it is not something that all 
        //components need to know nor is it something that should be maintained
        //in the redux store (for all components to access). Instead, each comment comment needs to maintain this 
        //and make these calls on its own. 

        //set a timeout to make sure this is async and test functionality :) 
        setTimeout(this.asyncPullCommentersProfilePicture, 1500);
    }

    asyncPullCommentersProfilePicture() {
        //console.log("$$ Making axios call in comment to determine", this.props.author + "'s", "choice of profile picture")

        let querryUsername = {
            "username": this.props.author
        }

        axios.post("http://localhost:1080/user/profile/", querryUsername)
            .then((response) => {
                //console.log(response);
                //dispatch(fetched_profile_picture(response.data))

                if (response.data.pictureName) {
                    this.setState({
                        commentPhoto: response.data.pictureName
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
            <div className="postedCommentContainer">
                
                {/* conditionally render the poster's profile picture if we've received it from MongoDB */}
                {
                
                this.state.commentPhoto
                    ? <img className="postedCommentPhoto" src={require(`../res/userIcons/${this.state.commentPhoto}`)}></img>
                    : <Spinner animation="grow" />
                
                }

                <div readOnly className="postedCommentInput" ><span className="postedCommentName">{this.props.author}</span> <span>&nbsp;</span> {this.props.comment}</div>
            </div>
        );
    }
    
}

export default Comment