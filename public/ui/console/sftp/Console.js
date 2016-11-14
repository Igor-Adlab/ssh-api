import React, { Component } from 'react'
import moment from 'moment'
import { Col, Row, FormControl, InputGroup, Button, ControlLabel, FormGroup, Panel, PanelGroup, Alert } from 'react-bootstrap'
import { Ls, Mkdir, Readfile, Remove, Touch, Update } from './actions'

const ACTION_LS = "ACTION_LS";
const ACTION_READ = "ACTION_READ";
const ACTION_MKDIR = "ACTION_MKDIR";
const ACTION_TOUCH = "ACTION_TOUCH";
const ACTION_REMOVE = "ACTION_REMOVE";
const ACTION_UPDATE = "ACTION_UPDATE";

export default class Console extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            active: ACTION_LS
        };
    }

    wrap(id, title, content) {
        return (
            <Panel eventKey={id} header={title}>
                {content}
            </Panel>
        )
    }

    render() {
        let { active } = this.state;
        let { log, client } = this.props;

        return (
            <Row>
                <Col md={6}>
                    <h4>Actions</h4>
                    <PanelGroup activeKey={active} onSelect={active => this.setState({ active })} accordion>
                        { this.wrap(ACTION_LS, "Read Directory", <Ls client={client} />) }
                        { this.wrap(ACTION_READ, "Read File", <Readfile client={client} />) }
                        { this.wrap(ACTION_MKDIR, "Create Directory", <Mkdir client={client} />) }
                        { this.wrap(ACTION_TOUCH, "Create File", <Touch client={client} />) }
                        { this.wrap(ACTION_REMOVE, "Remove element", <Remove client={client} />) }
                        { this.wrap(ACTION_UPDATE, "Remove element", <Update client={client} />) }
                    </PanelGroup>
                </Col>
                <Col md={6}>
                    <h4>Activity Log</h4>
                    { !log.length && <Alert bsStyle="warning">Activity Log is Empty</Alert> }
                    { !!log.length && (
                        <div>
                            { log.map((response, index) => (
                                <div key={index} className={`panel ${ response.Ok ? 'panel-primary' : 'panel-danger' }`}>
                                    <div className="panel-heading">
                                        { response.Request }
                                        <div className="pull-right">{ moment(response.timestamp).fromNow() }</div>
                                    </div>
                                    <code style={{ margin: 0, padding: 0 }}>
                                        <pre style={{ margin: 0, borderRadius: "0 0 4px 4px" }}>{ JSON.stringify(response, null, 4) }</pre>
                                    </code>
                                </div>
                            )) }
                        </div>
                    ) }
                </Col>
            </Row>
        );
    }
}