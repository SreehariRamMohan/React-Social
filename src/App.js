import React from 'react';

import {Button} from "react-bootstrap"


import test_profile from "./res/userIcons/profile1.png"

import './App.css';

import Post from "./Post/Post"

import { connect } from 'react-redux';

import { typed_message, post_message, clear_message, post_message_mongo, fetch_data_from_mongo } from "./actions"

import {withRouter } from 'react-router-dom'

import CustomNavbar from "./Navbar/CustomNavbar";

function mapStateToProps(state) {
  return {
    messages: state.messages,
    message: state.message,
    username: state.username,
    loggedIn: state.loggedIn,
    pictureName: state.pictureName,
  };
}

class App extends React.Component {


  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.postButton = this.postButton.bind(this);
  }

  componentDidMount() {


    if (!this.props.loggedIn) {
      console.log("oops, you're not logged in :)", this.props.loggedIn, this.props.username)
      this.props.history.push("/");
      return;
    } else {
      console.log("Trying to fetch data in component did mount");
      this.props.dispatch(fetch_data_from_mongo());
    }

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
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    const finalDateTime = month + " " + day + " at " + strTime

    return finalDateTime;
  }


  postButton() {

    var date = new Date();

    var post_key = date.getTime();//this.props.messages.length; using the length of the messages array is a bad idea (since 2 keys can be the same). Much better to use time in millis since 1970
    console.log("Post key is " + post_key);

    var post_date = this.getPostingDate(date)
    console.log("Posting date to display is " + post_date);

    this.props.dispatch(post_message(post_key, post_date, this.props.username));
    this.props.dispatch(clear_message());
    this.props.dispatch(post_message_mongo(this.props.message, post_date, post_key, this.props.username));
  }


  render() {
    return (
      <div className="App">

        <CustomNavbar />

        <header className="containerPost">


          <div className="card">
            <p className="appCreatePost">Create post</p>

            <div className="postContainer">
              <img src={require(`./res/userIcons/${this.props.pictureName}`)} className="profilePostApp" alt="profile"></img>
              <textarea onChange={this.handleTextChange}
                className="postInput"
                value={this.props.message}
                placeholder="What's on your mind?"
              />
            </div>

            <div className="postButtonContainer">
              <Button className="postButton" variant="outline-primary" onClick={this.postButton}>Post</Button>
            </div>

          </div>
          
          {
            this.props.messages.map((message, index) => <Post messageContent={message.message} date={message.date} key={message.key} author={message.author} key_index={message.key} />)
          }

        </header>
      </div>
    );
  }

}
export default withRouter(connect(mapStateToProps, null)(App));
