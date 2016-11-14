import React, { Component } from 'react'
import { Col, Row, FormControl, InputGroup, Button, ControlLabel, FormGroup, Panel, PanelGroup, Alert } from 'react-bootstrap'

export default class Readfile extends Component {
    render() {
        let { client } = this.props;
        return (
            <FormGroup>
                <InputGroup>
                    <FormControl type="text" placeholder="Path..." />
                    <InputGroup.Button>
                        <Button>Exec!</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        );
    }
}