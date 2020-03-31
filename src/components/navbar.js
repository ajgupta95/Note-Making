import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <Link to="/" className="navbar-brand">Notes</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav" >
     
        
          <li className="navbar-item">
          <Link to="/signup" className="nav-link">Sign Up</Link>
          </li>

          <li className="navbar-item">
          <Link to="/login" className="nav-link">Log In</Link>
          </li>
        
          
        </ul>
        </div>
      </nav>
    );
  }
}
