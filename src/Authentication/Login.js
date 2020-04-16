import React from 'react';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';

import './Login.css';
import { connect } from 'react-redux';
import { create_user_mongo, login_user_mongo } from "../actions"
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'


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

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.test_bcrypt = this.test_bcrypt.bind(this);
        this.redirectToSignup = this.redirectToSignup.bind(this);
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

    componentDidMount() {

        //for auto login

        this.state = {
            username: "sree",
            password: "sree"
        }
        this.handleSubmit()
    }

    handleSubmit(event) {
        console.log("form submitted", this.state.username, this.state.password)
        //event.preventDefault();
        //this.test_bcrypt();
        this.props.dispatch(login_user_mongo(this.state.username, this.state.password))
            .then(() => {
                console.log("finished logging in the user", this.props.username, "logged in?", this.props.loggedIn)
                if (this.props.loggedIn) {
                    this.props.history.push("/home");


                } else {
                    alert("Oops, wrong username or password")
                }

            })

    }

    test_bcrypt() {
        console.log("Testing bcrypt on username:", this.state.username, "password:", this.state.password);


        const password = this.state.password;

        bcrypt.hash(this.state.password, saltRounds, function (err, hash) {
            console.log("---", hash)

            console.log("Is Hashed passowrd equal to real password?")

            console.log(password)

            bcrypt.compare("sreehari", hash, function (err, result) {
                // result == true
                console.log("result #1", result)
            });
            bcrypt.compare("sreemari", hash, function (err, result) {
                // result == false
                console.log("result #2", result)
            });
        });



    }

    redirectToSignup() {
        this.props.history.push("/signup");
    }

    render() {
        return (
            <div className="Login">

                <div className="containerLogin">
                    <div className="loginCard">

                        <p className="loginText">Login</p>

                        {/* onSubmit={this.handleSubmit}  */}
                        <form className="formLogin">
                            <input name="username" onChange={this.handleChange} value={this.state.username} className="username-input" placeholder="Username"></input>

                            <input name="password" type="password" onChange={this.handleChange} value={this.state.password} className="password-input" placeholder="password"></input>

                            <Button onClick={this.handleSubmit}>login</Button>
                            {/* <input name="login" className="login-button" type="submit" value="Login" /> */}
                        </form>

                        <p className="loginRedirect">Don't have an account? Signup <span onClick={this.redirectToSignup} className="redirectToSignup">here</span></p>

                    </div>
                </div>





            </div>

        );
    }

}
export default withRouter(connect(mapStateToProps, null)(Login));