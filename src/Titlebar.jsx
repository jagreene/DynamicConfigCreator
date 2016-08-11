import React, { Component } from 'react';
import logo from '../tableau_logo.png'
import { Navbar } from 'react-bootstrap';

//----------------------Navbar---------------------//
// Component for the top navbar, purely presentational
//-------------------------------------------------//

class Titlebar extends Component {
  render() {
    return (
      <Navbar fluid>
        <img
          className="tableau-logo"
          src={logo}
          style={{ height: 40, width: 40, margin: 10 }}
          role="presentation"
        />
        <h2 style={{ display: 'inline', verticalAlign: 'middle' }}>
          Dynamic Connector Configuration Tool
        </h2>
      </Navbar>
    );
  }
}

export default Titlebar;
