import React, { Component } from 'react'
import IOClient from 'socket.io-client'
import { Grid, Alert, Button } from 'react-bootstrap'

import Events, { EVENT_SFTP, SftpMap } from './event'

import Navigation from './Navigation'
import ConnectionForm from './ConnectionForm'
import Dashboard from './Dashboard'

export default class Application extends Component {
    constructor(...options) {
        super(...options);
        this.ws =IOClient.connect("http://localhost:3000");
        this.state = {
            connected: false,
            sftp: {},
            ssh: {},
        };

        this.onConnected = this.onConnected.bind(this)
    }

    componentDidMount() {
        Events.on(EVENT_SFTP, (client, response) => {
            this.setState({
                sftp: {
                    ...this.state.sftp || {},
                    [client]: [response, ...this.state.sftp[client] || []]
                }
            })
        })
    }

    onConnected(client, ok) {
        console.log("Connected!");
        this.ws.emit("pty.run", { client });
        this.setState({
            connected: { client, status: ok }
        });
    }
    
    render() {
        let { connected, sftp, ssh } = this.state;
        return (
            <div>
                <Navigation />
                <Grid>
                    { (!connected || !connected.status) && <Alert bsStyle="danger">Disconnected!</Alert> }
                    { (connected && connected.status) && <Alert bsStyle="success">
                        Connected! <strong>Client</strong>: { connected.client }
                        <Button bsSize="xsmall" bsStyle="danger" className="pull-right">Disconnect</Button>
                    </Alert> }
                    { (!connected || !connected.status) && <ConnectionForm connected={this.state.connected} onConnected={this.onConnected}/> }
                    { (connected && connected.status) && <Dashboard ws={this.ws} client={connected.client} log={{ sftp: sftp[connected.client] || [], ssh: ssh[connected.client] }} /> }
                </Grid>
            </div>
        )
    }
}