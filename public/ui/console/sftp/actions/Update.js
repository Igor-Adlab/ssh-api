import React, { Component } from 'react'
import { Col, Row, FormControl, InputGroup, Button, ControlLabel, FormGroup, Panel, PanelGroup, Alert } from 'react-bootstrap'

export default class Touch extends Component {
    render() {
        let { client } = this.props;
        return (
            <div>
                <FormGroup>
                    <FormControl type="text" placeholder="Path..." />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Content: </ControlLabel>
                    <FormControl componentClass="textarea" placeholder="" />
                </FormGroup>
                <FormGroup>
                    <Button className="pull-right">Exec</Button>
                </FormGroup>
            </div>
        );
    }
}