import React from 'react';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';


import './Profile.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'

import {update_profile_picture_mongo, update_profile_picture} from "../actions"

var classNames = require('classnames');

function mapStateToProps(state) {
    return {
        messages: state.messages,
        message: state.message,
        username: state.username,
        loggedIn: state.loggedIn,
    };
}

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            canSelectProfile: true,
            selectedProfile: ""
        }

        this.onClickProfilePicture = this.onClickProfilePicture.bind(this);
        this.confirmSelection = this.confirmSelection.bind(this);
        this.resetSelection = this.resetSelection.bind(this);

    }

    componentDidMount() {
        if(!this.props.loggedIn) {
            console.log("oops, you're not logged in :)", this.props.loggedIn, this.props.username)
            //this.props.history.push("/");
            return;
        }
    }

    profilePhotosArray() {
        var photos = []
        for (var i = 1; i <= 14; i++) {
            photos.push("profile" + i + ".png");
        }
        //console.log(photos)
        return photos;

    }

    returnImageComponent(name, index) {
        const picture = require('../res/userIcons/' + name);

        //const wrapperClassName = "profileWrapper" + " " + name + " hover";

        return (
            <div key={index}
            onClick={() => this.onClickProfilePicture(name)}
                className=
                {
                classNames(

                "profileWrapper", name, 
                
                {"hover": this.state.canSelectProfile},
                
                {"selectedNewProfile": this.state.selectedProfile === name}
                
                )
                }
                ><img 
                src={picture} 
                /></div>
        );

    }

    confirmSelection(event) {
        console.log("confirm selection clicked");
        this.props.dispatch(update_profile_picture(this.state.selectedProfile));
        this.props.dispatch(update_profile_picture_mongo(this.state.selectedProfile, this.props.username))
    }

    resetSelection(event) {
        console.log("reset selection clicked");

        this.setState({
            canSelectProfile: true,
            selectedProfile: ""
        })
    }

    onClickProfilePicture(pictureName) {

        if(!this.state.canSelectProfile) {
            return;
        }
        
        console.log("Clicked " + pictureName);

        this.setState({
            canSelectProfile: false,
            selectedProfile: pictureName
        });

    }

    render() {
        return (
            <div className="Profile">
                <div className="containerProfile">
                    <p className="profilePageText">Profile Page</p>

                    <hr className="profileDivide"></hr>

                    <p>Change your user icon</p>

                    <div className="profileGrid">

                        {
                            this.profilePhotosArray().map((name, index) => this.returnImageComponent(name, index))
                        }

                    </div>

                    <div className="buttonBoxProfile">
                        <Button onClick={this.resetSelection} shape="round">reset selection</Button>
                        <Button onClick={this.confirmSelection} shape="round">confirm selection</Button>
                    </div>

                </div>
            </div>

        );
    }

}
export default withRouter(connect(mapStateToProps, null)(Profile));