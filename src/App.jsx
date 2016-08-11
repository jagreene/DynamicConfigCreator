import React, { Component } from 'react'
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
    let currentConnector = consts.getDefaultEmptyConnector();
    let connectors = { [currentConnector.id]: currentConnector };
    const xml = convertToXml.outputConfigs(Object.values(connectors));
    this.state = {
      connectors,
      currentConnector,
      xml,
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
      if (connectors) {
        console.log(connectors);
        let currentConnector = Object.values(connectors)[0];
        const xml = convertToXml.outputConfigs(Object.values(connectors));
        this.setState({ connectors, currentConnector, xml });
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  updateXml() {
    fetch(
      'http://localhost:3001/connectors', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          xml: this.state.xml,
          json: this.state.connectors,
        })
      }
    );
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
