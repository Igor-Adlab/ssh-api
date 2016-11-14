import React, { Component } from 'react'
import { Col, Row, FormControl, InputGroup, Button, ControlLabel, FormGroup, Panel, PanelGroup, Alert } from 'react-bootstrap'

export default class Mkdir extends Component {
    render() {
        let { client } = this.props;
        return (
            <div>
                <FormGroup>
                    <FormControl type="text" placeholder="Name..." />
                </FormGroup>
                <FormGroup>
                    <FormControl type="text" placeholder="Path..." />
                </FormGroup>
                <FormGroup>
                    <Button className="pull-right">Exec</Button>
                </FormGroup>
            </div>
        );
    }
}