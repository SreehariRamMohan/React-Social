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
    console.log(event.target.value);
    this.props.dispatch(typed_message(event.target.value));
  }

  postButton() {
    this.props.dispatch(post_message())
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
            this.props.messages.map((message) => <Post messageContent={message} />)
          }

        </header>
      </div>
    );
  }

}
export default connect(mapStateToProps, null)(App);
