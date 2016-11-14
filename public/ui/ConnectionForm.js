import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

export default class ConnectionForm extends Component {
    constructor() {
        super(...arguments)

        this.state = {
            loading: false
        }
    }

    onConnect() {
        let { onConnected } = this.props;
        let clientId = findDOMNode(this.refs.client).value;
        this.setState({ loading: true });

        fetch(`/api/v1/client/connect/${ clientId }`)
            .then(res => res.json())
            .then(data => onConnected(clientId, data.Ok));
    }
    
    render() {
        let { connected } = this.props;
        let { loading } = this.state;
        return (
            <div>
                <FormGroup>
                    <ControlLabel>Client ID:</ControlLabel>
                    <FormControl ref="client" type="text" disabled={!!connected}/>
                </FormGroup>
                <FormGroup>
                    <Button onClick={this.onConnect.bind(this)} block bsStyle="success" disabled={!!connected || loading} >Connect</Button>
                </FormGroup>
            </div>
        );
    }
}