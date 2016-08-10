import React, { Component, PropTypes } from 'react';
import { Col, Row, Nav, NavItem, Button, Glyphicon } from 'react-bootstrap'
import * as Constants from './Constants.js'

class ConnectorList extends Component {
  render() {
    const sortedConnectors = this.props.connectors.sort((a,b) =>
      Date.parse(b.createdDate) - Date.parse(a.createdDate)
    );

    const navItems = sortedConnectors.map(connector=>
      <NavItem key={connector.id} eventKey={connector.id}>
        {connector.name}
      </NavItem>
    );

    return (
      <Col md={3}>
        <Row>
          <Col md={9}>
            <h3> Connectors </h3>
          </Col>
          <Col md={3}>
            <Button
              bsSize="small"
              bsStyle="primary"
              onClick={this.props.addConnector}
              style={{marginTop: 20}}
              block
            >
              <Glyphicon bsSize="xsmall" glyph="plus" />
            </Button>
          </Col>
        </Row>
        <Nav
          bsStyle='pills'
          activeKey={this.props.currentConnector.id}
          onSelect={this.props.updateSelectedConnector}
          stacked
        >
          {navItems}
        </Nav>
      </Col>
    );
  }
}

ConnectorList.propTypes = {
  updateSelectedConnector: PropTypes.func.isRequired,
  addConnector: PropTypes.func.isRequired,
  connectors: PropTypes.array.isRequired,
  currentConnector: PropTypes.object.isRequired,
}

export default ConnectorList;
