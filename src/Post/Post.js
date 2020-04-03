import React from 'react';
import profile from '../res/profile.JPG'
import './Post.css'

class Post extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="card">
                <div className="postContainer">
                    <img src={profile} className="profilePost"></img>
                    <textarea onChange={this.handleTextChange}
                        className="postInput"
                        value={this.props.messageContent}
                        readOnly
                    />
                </div>
            </div>
        );
    }
}

export default Post