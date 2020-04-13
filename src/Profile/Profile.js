import React from 'react';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';

import './Profile.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'

import { update_profile_picture_mongo, update_profile_picture, update_premium_user_status } from "../actions"

import CustomNavbar from "../Navbar/CustomNavbar";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from "../StripeElements/CheckoutForm/InjectedCheckoutForm"

import {Form} from "react-bootstrap"

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
        if (!this.props.loggedIn) {
            console.log("oops, you're not logged in :)", this.props.loggedIn, this.props.username)
            this.props.history.push("/");
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

    render() {
        return (
            <Elements stripe={stripePromise}>
                <div className="Profile">

                    <CustomNavbar />

                    <div className="containerProfile">
                        <p className="profilePageText">Profile Page</p>

                        <hr className="profileDivide"></hr>

                        <p className="perkHeaderText">Personal Information</p>


                        <input value={this.props.username}></input>
                        <textarea placeholder="your bio..."></textarea>


                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Example select</Form.Label>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Example multiple select</Form.Label>
                                <Form.Control as="select" multiple>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control as="textarea" rows="3" />
                            </Form.Group>
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

                        <p>A membership fee of $10.00 allows you to view the people who liked posts on React Social</p>

                        <CheckoutForm />
                    </div>


                </div>
            </Elements>

        );
    }

}
export default withRouter(connect(mapStateToProps, null)(Profile));