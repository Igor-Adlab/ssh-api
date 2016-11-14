import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import strip from 'strip-ansi'
import { Col, Row, FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap'

export default class Console extends Component {
    constructor() {
        super(...arguments);

        this.terminal = new Terminal({cursorBlink: true});

    }

    componentDidMount() {
        let { ws, client } = this.props;
        let wrapper = findDOMNode(this.refs.wrapper);

        this.terminal.open(wrapper);

        ws.on("pty.data", ({ client, payload }) => this.terminal.write(payload));
        this.terminal.on('key', (cmd, ev) => {
            console.log(cmd);
            ws.emit("pty.message", { client, cmd })
        });
    }

    render() {
        let { log } = this.props;
        return (
            <Row>
                <Col md={12}>
                    <h4>XTerm</h4>
                    <div ref="wrapper" style={{ height: "350px" }}></div>
                </Col>
            </Row>
        );
    }
}