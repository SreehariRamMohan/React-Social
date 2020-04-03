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

  getPostingDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    const finalDateTime = month + " " + day + " at " + strTime

    return finalDateTime;
  }
  

  postButton() {
    var post_key = this.props.messages.length;
    console.log("Post key is " + post_key);

    var post_date = this.getPostingDate(new Date())
    console.log("Posting date to display is " + post_date);



    this.props.dispatch(post_message(post_key, post_date))
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
            this.props.messages.map((message, index) => <Post messageContent={message.message} date={message.date} key={index} key_index={index}/>)
          }

        </header>
      </div>
    );
  }

}
export default connect(mapStateToProps, null)(App);
