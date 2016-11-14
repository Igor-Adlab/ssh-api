import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'

export default class Navigation extends Component {
    render() {
        return (
            <Navbar inverse style={{ borderRadius: "0" }}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">SSH Client.UI</a>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        );
    }
}