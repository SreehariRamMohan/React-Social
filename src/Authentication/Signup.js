import React from 'react';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';

import './Signup.css';
import { connect } from 'react-redux';
import { create_user_mongo } from "../actions"
import { BrowserRouter as Router, Route, Redirect, withRouter, Link } from 'react-router-dom'
import { Form, Spinner, Button as BootstrapButton } from "react-bootstrap"

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

        }

        this.username = React.createRef();
        this.email = React.createRef();
        this.gender = React.createRef();
        this.password = React.createRef();
        this.confirm_password = React.createRef();
        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);

    }

    handleChange(event) {
        const name = event.target.name;
    }

    handleSubmit(event) {
        console.log("form submitted", this.username.current.value, this.password.current.value, this.email.current.value, this.gender.current.value);
        event.preventDefault();


        const password = this.password.current.value;
        const confirm_password = this.confirm_password.current.value;

        console.log("password: ", password, confirm_password);

        if(password !== confirm_password) {
            alert("passwords don't match!")
            return;
        }

        this.props.dispatch(create_user_mongo(this.username.current.value, this.password.current.value, "profile11.png", 
                                                this.gender.current.value, this.email.current.value))
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

                    <div className="signupCard">
                        <p className="signupText">Signup</p>

                        <Form className="formSignup">
                            <Form.Group controlId="nameControl">
                                <Form.Label>Username: </Form.Label>
                                <Form.Control name="name" onChange={this.handleChange} ref={this.username} type="text" placeholder="Username" />
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
                                <Form.Control name="email" onChange={this.handleChange} ref={this.email} type="email" placeholder="name@example.com"/>
                            </Form.Group>
                            <Form.Group controlId="nameControl">
                                <Form.Label>Password: </Form.Label>
                                <Form.Control name="name" onChange={this.handleChange} ref={this.password} type="password" />
                            </Form.Group>
                            <Form.Group controlId="nameControl">
                                <Form.Label>Confirm Password: </Form.Label>
                                <Form.Control name="name" onChange={this.handleChange} ref={this.confirm_password} type="password" />
                            </Form.Group>
                            <Button onClick={this.handleSubmit}>Signup</Button>
                        </Form>

                        <p className="signupRedirect">Already have an account? Login <span onClick={this.redirectToLogin} className="redirectToLogin">here</span></p>
                    </div>




                </div>




            </div>

        );
    }

}
export default withRouter(connect(mapStateToProps, null)(Signup));