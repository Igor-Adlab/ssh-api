import React, { Component } from 'react'
import moment from 'moment'
import { findDOMNode } from 'react-dom'
import Events, { EVENT_SFTP, SftpMap } from '../../../event'
import { Col, Row, FormControl, InputGroup, Button, ControlLabel, FormGroup, Panel, PanelGroup, Alert } from 'react-bootstrap'

export default class Ls extends Component {
    act() {
        let path = findDOMNode(this.refs.path).value;
        let { client } = this.props;
        return fetch(`/sftp/readdir?client=${client}&path=${path}`)
            .then(res => res.json())
            .then(response => {
                Events.emit(EVENT_SFTP, client, { ...response, timestamp: moment().format("YYYY-MM-DDTHH:mm:ssZ") });
                return response
            })
            .catch(error => console.error(error))
    }
    
    render() {
        let { client } = this.props;
        return (
            <FormGroup>
                <InputGroup>
                    <FormControl ref="path" type="text" placeholder="Path..." />
                    <InputGroup.Button>
                        <Button onClick={this.act.bind(this)}>Exec!</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        );
    }
}