import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <Link to="/usernotes" className="navbar-brand"> Your Notes</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav" >
     
        
          <li className="navbar-item">
          <Link to="/addnote" className="nav-link">Add Note</Link>
          </li>
        
          
        </ul>
        </div>
      </nav>
    );
  }
}
