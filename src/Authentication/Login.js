import React from 'react';

import './Login.css';


var bcrypt = require('bcryptjs');
const saltRounds = 10;

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
        this.test_bcrypt();
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

    render() {
        return (

            <div className="Login">

                <div className="containerLogin">
                    <p className="loginText">Login</p>

                    <form onSubmit={this.handleSubmit} className="formLogin">
                        <input name="username" onChange={this.handleChange} value={this.state.username} className="username-input" placeholder="Username"></input>

                        <input name="password" onChange={this.handleChange} value={this.state.password} className="password-input" placeholder="password"></input>

                        <input name="login" className="login-button" type="submit" value="Login" />
                    </form>


                </div>




            </div>

        );
    }

}
export default Login;