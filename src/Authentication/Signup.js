import React from 'react';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';

import './Signup.css';
import { connect } from 'react-redux';
import { create_user_mongo } from "../actions"
import { BrowserRouter as Router, Route, Redirect, withRouter, Link } from 'react-router-dom'


var bcrypt = require('bcryptjs');
const saltRounds = 10;


function mapStateToProps(state) {
    return {
        messages: state.messages,
        message: state.message,
        username: state.username,
        loggedIn: state.loggedIn
    };
}

class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);

    }

    handleChange(event) {
        const name = event.target.name;

        if (name === "username") {
            this.setState({
                username: event.target.value
            })
        } else if (name === "password") {
            this.setState({
                password: event.target.value
            })
        }
    }

    handleSubmit(event) {
        console.log("form submitted", this.state.username, this.state.password)
        event.preventDefault();
        this.props.dispatch(create_user_mongo(this.state.username, this.state.password, "profile11.png"))
            .then(() => {
                console.log("finished creating the user", this.props.username, "logged in?", this.props.loggedIn)
                if (this.props.loggedIn) {
                    this.props.history.push("/home");
                } else {
                    alert("Oops, there is already a user with that username!")
                }

            })

    }

    redirectToLogin() {
        this.props.history.push("/")        
    }

    render() {
        return (
            <div className="Signup">

                <div className="containerSignup">
                    <p className="signupText">Signup</p>

                    <form className="formSignup">
                        <input name="username" onChange={this.handleChange} value={this.state.username} className="username-input" placeholder="Username"></input>

                        <input name="password" type="password" onChange={this.handleChange} value={this.state.password} className="password-input" placeholder="password"></input>

                        <Button onClick={this.handleSubmit}>Signup</Button>
                    </form>

                    <p className="signupRedirect">Already have an account? Login <span onClick={this.redirectToLogin} className="redirectToLogin">here</span></p>


                </div>




            </div>

        );
    }

}
export default withRouter(connect(mapStateToProps, null)(Signup));