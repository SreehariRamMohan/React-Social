import React from 'react';
import profile from './res/profile.JPG'
import './App.css';

import Post from "./Post/Post"


class App extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      message: "",
      messages: []
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.postButton = this.postButton.bind(this);
  }

  handleTextChange(event) {
    console.log(event.target.value);
    this.setState({
      message: event.target.value
    })
  }

  postButton() {
    this.setState({
      messages: [this.state.message, ...this.state.messages]
    });

    this.setState({
      message: ""
    });
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
              value={this.state.message}
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
            this.state.messages.map((message) => <Post messageContent={message}/>)
          }
         
        </header>
      </div>
    );
  }
  
}

export default App;
