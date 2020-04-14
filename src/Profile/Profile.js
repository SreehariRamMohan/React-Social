import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';
import './Profile.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'
import CustomNavbar from "../Navbar/CustomNavbar";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../StripeElements/CheckoutForm/InjectedCheckoutForm"
import { Form, Spinner, Button as BootstrapButton } from "react-bootstrap"
import {UPDATE_USERNAME, UPDATE_GENDER, UPDATE_EMAIL, UPDATE_BIO, update_personal_information, update_personal_information_mongo, update_profile_picture_mongo, update_profile_picture} from "../actions"

var classNames = require('classnames');
require('dotenv').config();



const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)

//console.log(stripePromise)

function mapStateToProps(state) {
    return {
        messages: state.messages,
        message: state.message,
        username: state.username,
        loggedIn: state.loggedIn,
        email: state.email,
        bio: state.bio,
        gender: state.gender,

    };
}

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            canSelectProfile: true,
            selectedProfile: "",
            
            saved: true, // form has 3 states: unsaved, saving, saved (represented by these two props)
            saving: false,
        }

        this.timeoutId = null;

        this.username = React.createRef();
        this.gender = React.createRef();
        this.email = React.createRef();
        this.bio = React.createRef();
        
        this.onClickProfilePicture = this.onClickProfilePicture.bind(this);
        this.confirmSelection = this.confirmSelection.bind(this);
        this.resetSelection = this.resetSelection.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            console.log("oops, you're not logged in :)", this.props.loggedIn, this.props.username)
            this.props.history.push("/");
            return;
        }
        
        this.username.current.value = this.props.username;
        this.email.current.value = this.props.email;
        this.gender.current.value = this.props.gender;
        this.bio.current.value = this.props.bio;

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

                        { "hover": this.state.canSelectProfile },

                        { "selectedNewProfile": this.state.selectedProfile === name }

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

        if (!this.state.canSelectProfile) {
            return;
        }

        console.log("Clicked " + pictureName);

        this.setState({
            canSelectProfile: false,
            selectedProfile: pictureName
        });

    }

    onSubmit(event) {

        if (event != null) {
            event.preventDefault();
        }
        
        this.setState({
            saved: false,
            saving: true
        })

        console.log("profile form details submitted", this.username.current.value, this.email.current.value, this.gender.current.value, this.bio.current.value)
    
        this.props.dispatch(update_personal_information(UPDATE_USERNAME, this.username.current.value))
        this.props.dispatch(update_personal_information_mongo(this.props.username, UPDATE_USERNAME, this.username.current.value))
        
        this.props.dispatch(update_personal_information(UPDATE_EMAIL, this.email.current.value));
        this.props.dispatch(update_personal_information_mongo(this.props.username, UPDATE_EMAIL, this.email.current.value));
    
        this.props.dispatch(update_personal_information(UPDATE_BIO, this.bio.current.value));
        this.props.dispatch(update_personal_information_mongo(this.props.username, UPDATE_BIO, this.bio.current.value));
        
        this.props.dispatch(update_personal_information(UPDATE_GENDER, this.gender.current.value));
        this.props.dispatch(update_personal_information_mongo(this.props.username, UPDATE_GENDER, this.gender.current.value));
            
        this.setState({
            saved: true, 
            saving: false
        })
    
    }

    handleChange(event) {
        
        //autosave form 0.5 seconds after the last change is logged.

        this.setState({
            saved: false,
            saving: true
        }) //when a change comes in, we are unsaved, and are not currently saving.

        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }

        this.timeoutId = setTimeout(() => {
            this.onSubmit(null);
            this.setState({
                saved: true,
                saving: false
            })
        }, 500); 

        console.log(event.target.name, event.target.value)
    }

    render() {
        return (
            <Elements stripe={stripePromise}>
                <div className="Profile">

                    <CustomNavbar />

                    <div className="containerProfile">
                        <p className="profilePageText">Profile Page</p>

                        <hr className="profileDivide"></hr>

                        <p className="perkHeaderText">Personal Information</p>

                        <Form className="profileFormText">
                            <Form.Group controlId="nameControl">
                                <Form.Label>Name: </Form.Label>
                                <Form.Control name="name" onChange={this.handleChange} ref={this.username} type="text" placeholder="Micheal Scott" />
                            </Form.Group>
                            
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control name="gender" as="select" ref={this.gender} onChange={this.handleChange}>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Non-binary</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="emailControl">
                                <Form.Label>Email: </Form.Label>
                                <Form.Control name="email" onChange={this.handleChange} ref={this.email} type="email" placeholder="name@example.com" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="textAreaControl">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control name="bio" onChange={this.handleChange} ref={this.bio} as="textarea" rows="3" placeholder="Write a little about yourself..." />
                            </Form.Group>
                            <BootstrapButton variant="primary" type="submit" onClick={this.onSubmit}>
                                {this.state.saving
                                    ? <Spinner animation="border" size="sm" /> 
                                    : null
                                }
                                <span>{this.state.saved ? "Saved" : 
                                
                                        this.state.saving ? " Saving" : "Click to Save"
    
                                }</span>
                            </BootstrapButton>
                        </Form>


                        <p className="perkHeaderText">Change your user icon</p>

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


                    <div className="containerCardPayments">
                        <p className="perkHeaderText">Upgrade to become a premium user</p>

                        <p>A membership fee of $10.00/hour allows you to search for friends on React-Social!</p>

                        <CheckoutForm />
                    </div>


                </div>
            </Elements>

        );
    }

}
export default withRouter(connect(mapStateToProps, null)(Profile));