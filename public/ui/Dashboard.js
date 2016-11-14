import React, { Component } from 'react'
import { Nav, NavItem } from 'react-bootstrap'

import SSHConsole from './console/ssh/Console'
import SFTPConsole from './console/sftp/Console'

const TAB_SSH = 'SSH'
const TAB_SFTP = 'SFTP'

export default class Dashboard extends Component {
    constructor() {
        super(...arguments)

        this.state = {
            tab: TAB_SFTP
        }
    }

    render() {
        let { log, client, ws } = this.props;
        let { tab } = this.state;
        return (
            <div>
                <h3 className="text-center">Dashboard!</h3>
                <Nav bsStyle="pills" activeKey={tab} onSelect={tab => this.setState({ tab })}>
                    <NavItem eventKey={TAB_SFTP} title="SFTP">Sftp Console</NavItem>
                    <NavItem eventKey={TAB_SSH} title="SSH">SSH Console</NavItem>
                </Nav>

                { tab == TAB_SFTP && <SFTPConsole client={client} log={log.sftp || []} /> }
                { tab == TAB_SSH && <SSHConsole ws={ws} client={client} log={log.ssh || []}/> }
            </div>
        );
    }
}