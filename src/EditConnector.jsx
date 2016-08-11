import React, { Component, PropTypes } from 'react';
import {FormGroup, ControlLabel, FormControl, Button, Radio, Form, Col, Row, Checkbox, Glyphicon} from 'react-bootstrap'
import * as consts from './constants.js'

class EditConnector extends Component {
  versionCheckChanged(event) {
    const updatedVersions = {
      ...this.props.connector.versionSupport,
      [event.target.id]: event.target.checked,
    };
    const updatedConnector = {
      ...this.props.connector,
      versionSupport: updatedVersions,
    };
    this.props.updateConnector({ [updatedConnector.id]: updatedConnector })
  }

  skuCheckChanged(event) {
    const updatedSkus = {
      ...this.props.connector.supportedSKUs,
      [event.target.id]: event.target.checked,
    };
    const updatedConnector = {
      ...this.props.connector,
      supportedSKUs: updatedSkus,
    };
    this.props.updateConnector({ [updatedConnector.id]: updatedConnector })
  }

  releaseStatusChanged(event) {
    const updatedReleaseStatus = event.target.id;
    const updatedConnector = {
      ...this.props.connector,
      releaseStatus: updatedReleaseStatus,
    };
    this.props.updateConnector({ [updatedConnector.id]: updatedConnector })
  }

  LocalizedNameChanged(event) {
    const updatedLocalizedNames = {
      ...this.props.connector.localizedNames,
      [event.target.id]: event.target.value,
    }
    const updatedConnector = {
      ...this.props.connector,
      localizedNames: updatedLocalizedNames,
    };
    this.props.updateConnector({ [updatedConnector.id]: updatedConnector })
  }

  connectorPropertyChanged(event) {
    const updatedConnector = {
      ...this.props.connector,
      [event.target.id]: event.target.value,
    };
    this.props.updateConnector({ [updatedConnector.id]: updatedConnector })
  }

  createTextEdit(label, placeholder, changeHandler, propertyName, editType) {

    changeHandler = changeHandler || this.connectorPropertyChanged;
    propertyName = propertyName || label;
    editType = editType || "text";

    return (
      <FormGroup key={propertyName} controlId={propertyName} >
        <Col sm={3} className="lineLabel">
          <ControlLabel>{label}:</ControlLabel>
        </Col>
        <Col sm={9}>
          <FormControl
            type={editType}
            placeholder={placeholder}
            value={this.props.connector[propertyName]}
            onChange={changeHandler.bind(this)}
          />
        </Col>
      </FormGroup>
    );
  }

  createRadio(changeHandler, id, label, isChecked) {
    return (
      <Radio
        onChange={changeHandler}
        id={id}
        key={label}
        checked={isChecked}
        inline
      >
        {label}
      </Radio>
    );
  }

  createCheckBox(changeHandler, id, label, isChecked) {
    return (
      <Checkbox
        onChange={changeHandler}
        id={id}
        key={label}
        checked={isChecked}
        inline
      >
        {label}
      </Checkbox>
    );
  }

  createCheckBoxGroup(elements, label) {
    return (
      <FormGroup controlId={label}>
        <Col sm={3} className="lineLabel">
          <ControlLabel>{label}:</ControlLabel>
        </Col>
        <Col sm={9}>
          {elements}
        </Col>
      </FormGroup>
    );
  }

  render() {
    const connector = this.props.connector;
    const versionChecks = consts.versions.map(version =>
      this.createCheckBox(
        this.versionCheckChanged.bind(this),
        version,
        version,
        connector.versionSupport[version]
      )
    );

    const skuChecks = consts.skus.map(sku =>
      this.createCheckBox(
        this.skuCheckChanged.bind(this),
        sku,
        sku,
        connector.supportedSKUs[sku]
      )
    );

    const releaseStatusRadios = consts.releaseStatuses.map(status =>
      this.createRadio(
        this.releaseStatusChanged.bind(this),
        status,
        status,
        connector.releaseStatus === status
      )
    )

    const localizedNamesEdits = consts.locales.map(locale =>
      this.createTextEdit(
        locale,
        "Mandrill",
        this.LocalizedNameChanged.bind(this),
        locale,
      )
    )

    return (
      <Col md={5} className="EditForm">
        <Form horizontal>
          <Row>
            <Col md={9}>
              <h3 className="formHeader">Connector Info</h3> <br />
            </Col>
            <Col md={3}>
              <Button
                bsSize="small"
                bsStyle="primary"
                onClick={this.props.updateXml}
                style={{marginTop: 20}}
                block
              >
                Save <Glyphicon bsSize="xsmall" glyph="save" />
              </Button>
            </Col>
          </Row>
          {this.createTextEdit("Name", "Mandrill", null, "name")}
          {this.createTextEdit("Class Name", "mailchimp-mandrill", null, "className")}
          {this.createTextEdit("Url", "https://connectors.tableau.com", null, "url")}
          {this.createTextEdit("Dialog Width", "600", null, "width", "number")}
          {this.createTextEdit("Dialog Height", "400", null, "height", "number")}
          {this.createCheckBoxGroup(versionChecks, "Supported Versions")}
          {this.createCheckBoxGroup(skuChecks, "Supported SKUs")}
          {this.createCheckBoxGroup(releaseStatusRadios, "Release Status")}
          <br />
          <h4 className="formHeader">Localized Names</h4> <br />
          <div>
            {localizedNamesEdits}
          </div>
          <br />
        </Form>
      </Col>
    );
  }
}

EditConnector.propTypes = {
  connector: PropTypes.object.isRequired,
  updateConnector: PropTypes.func.isRequired,
  updateXml: PropTypes.func.isRequired
};

export default EditConnector;
