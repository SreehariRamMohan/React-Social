import React from 'react';

import './Profile.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'

function mapStateToProps(state) {
    return {
        messages: state.messages,
        message: state.message,
        username: state.username,
        loggedIn: state.loggedIn
    };
}

class Profile extends React.Component {

    constructor(props) {
        super(props);

     
        
    }

    profilePhotosArray() {
        var photos = []
        for (var i = 1; i <= 14; i++) {
            photos.push("profile" + i + ".png");
        }
        console.log(photos)
        return photos;
       
    }

    returnImageComponent(name) {
        console.log("trying to create the image", name);
        const picture = require('../res/userIcons/' + name);

        return (
            <div className="profileWrapper"><img src={picture} /></div>
        );

    }

    render() {
        return (
            <div className="Profile">
                <div className="containerProfile">
                    <p className="profilePageText">Profile Page</p>

                    <hr></hr>

                    <p>Choose a user icon</p>

                    <div className="profileGrid">

                        {
                            this.profilePhotosArray().map((name) => this.returnImageComponent(name))
                        }

                    </div>

                </div>
            </div>

        );
    }

}
export default withRouter(connect(mapStateToProps, null)(Profile));