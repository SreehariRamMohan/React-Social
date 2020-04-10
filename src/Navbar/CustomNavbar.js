import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button } from "react-bootstrap"

import {Link} from 'react-router-dom'

class CustomNavbar extends React.Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to={"/home"}>React-Social</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
                        <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button as={Link} to={"/"} variant="outline-danger">Logout</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default CustomNavbar;