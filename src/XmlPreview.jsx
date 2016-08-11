import React, { Component, PropTypes } from 'react';
import Highlight from 'react-highlight'
import * as convertToXml from './convertToXml.js'
import { Col, Row, DropdownButton, MenuItem } from 'react-bootstrap'
import * as consts from './constants.js'

class XmlPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: "current"};
    this.updatedSelected = this.updatedSelected.bind(this);
  }

  updatedSelected(eventKey, event){
    this.setState({selected: eventKey});
  }

  render() {
    const menuItems = ["current", ...consts.versions].map(version =>
      <MenuItem key={version} eventKey={version}> {version} </MenuItem>
    );

    let xml = ""
    if (this.state.selected === "current" ) {
      xml = convertToXml.outputConnector(this.props.connector);
    } else {
      xml = this.props.xml[this.state.selected];
    }

    return (
      <Col md={4}>
        <Row>
          <Col md={9}>
            <h3> XML Preview </h3>
          </Col>
          <Col md={2} style={{marginTop: 15}}>
            <DropdownButton
              title={this.state.selected}
              bsStyle="primary"
              onSelect={this.updatedSelected}
              id="preview-select"
            >
              {menuItems}
            </DropdownButton>
          </Col>
        </Row>
        <Highlight className="xml">
          {xml}
        </Highlight>
      </Col>
    );
  }
}

XmlPreview.propTypes = {
  connector: PropTypes.object,
  xml: PropTypes.object
}

export default XmlPreview;
