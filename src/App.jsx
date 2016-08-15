import React, { Component } from 'react'
import toastr from 'toastr'
import Titlebar from "./Titlebar.jsx"
import ConnectorList from './ConnectorList.jsx'
import EditConnector from './EditConnector.jsx'
import XmlPreview from './XmlPreview.jsx'
import { Row } from 'react-bootstrap'
import * as convertToXml from './convertToXml.js'
import * as consts from './constants.js'

class App extends Component {
  constructor(props) {
    super(props);
    const currentConnector = consts.getDefaultEmptyConnector();
    const connectors = { [currentConnector.id]: currentConnector };
    const xml = convertToXml.outputConfigs(Object.values(connectors));
    const lockedNames = [];
    this.state = {
      connectors,
      currentConnector,
      xml,
      lockedNames,
    };

    this.fetchConnectors = this.fetchConnectors.bind(this);
    this.updateXml = this.updateXml.bind(this);
    this.updateConnector = this.updateConnector.bind(this);
    this.addConnector= this.addConnector.bind(this);
    this.updateSelectedConnector = this.updateSelectedConnector.bind(this)

    this.fetchConnectors();
  }

  fetchConnectors() {
    fetch('http://localhost:3001/connectors')
    .then(response => {
      return response.json();
    })
    .then(connectors => {
      if (Object.keys(connectors).length > 0) {
        const currentConnector = Object.values(connectors)[0];
        const xml = convertToXml.outputConfigs(Object.values(connectors));
        const lockedNames = Object.keys(connectors)
        this.setState({ connectors, currentConnector, xml, lockedNames });
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  updateXml() {
    const connectors = Object.values(this.state.connectors);
    const valid = connectors.reduce((valid, connector) => !!connector.name);
    if (valid) {
      fetch( 'http://localhost:3001/connectors', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          xml: this.state.xml,
          json: this.state.connectors,
        })
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const lockedNames = Object.keys(this.state.connectors);
        this.setState({ lockedNames });
        toastr.success("Save Successful");
      })
      .catch(err => {
        toastr.error(err, "Save Error");
      });
    } else {
      toastr.error("Can't save files when any connectors are missing a name", "Save Error");
    }
  }

  addConnector() {
    const currentConnector = consts.getDefaultEmptyConnector();
    const connectors = { ...this.state.connectors, [currentConnector.id]: currentConnector };
    const xml = convertToXml.outputConfigs(Object.values(connectors));
    this.setState({
      connectors,
      currentConnector,
      xml,
    });
  }

  updateSelectedConnector(id) {
    console.log(id)
    this.setState({ currentConnector: this.state.connectors[id] });
  }

  updateConnector(connector) {
    let connectors = {...this.state.connectors, ...connector };
    let xml = convertToXml.outputConfigs(Object.values(connectors));
    let currentConnector = connectors[this.state.currentConnector.id];
    this.setState({ connectors, currentConnector, xml } );
  }

  render() {
    const lockedName = this.state.lockedNames.includes(this.state.currentConnector.id);
    return (
      <Row className="App" style={{paddingBottom: 15}}>
        <Titlebar />
        <div style={{paddingLeft: 15, paddingRight: 15}}>
          <ConnectorList
            connectors={Object.values(this.state.connectors)}
            currentConnector={this.state.currentConnector}
            updateSelectedConnector={this.updateSelectedConnector}
            addConnector={this.addConnector}
          />
          <EditConnector
            connector={this.state.currentConnector}
            lockedName={lockedName}
            updateConnector={this.updateConnector}
            updateXml={this.updateXml}
          />
          <XmlPreview
           connector={this.state.currentConnector}
           xml={this.state.xml}
          />
        </div>
      </Row>
    );
  }
}

export default App;
