import React from 'react';
import profile from './res/profile.JPG'
import './App.css';

import Post from "./Post/Post"

import { connect } from 'react-redux';

import {typed_message, post_message, clear_message} from "./actions"

function mapStateToProps(state) {
  return {
    messages: state.messages,
    message: state.message
  };
}

class App extends React.Component {


  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.postButton = this.postButton.bind(this);
  }

  handleTextChange(event) {
    //console.log(event.target.value);
    this.props.dispatch(typed_message(event.target.value));
  }

  postButton() {
    var post_key = this.props.messages.length;
    console.log("Post key is " + post_key);
    this.props.dispatch(post_message(post_key))
    this.props.dispatch(clear_message())
  }

  render() {
    return (
      <div className="App">
        <header className="container">


          <div className="card">
            <p>Create post</p>

            <div className="postContainer">
              <img src={profile} className="profilePost"></img>
              <textarea onChange={this.handleTextChange}
                className="postInput"
                value={this.props.message}
                placeholder="What's on your mind?"
              />
            </div>

            <div className="postButtonContainer">
              <button
                className="postButton"
                onClick={this.postButton}
              >Post</button>
            </div>



          </div>

          {
            this.props.messages.map((message, index) => <Post messageContent={message.message} key={index} key_index={index}/>)
          }

        </header>
      </div>
    );
  }

}
export default connect(mapStateToProps, null)(App);
