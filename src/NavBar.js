import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";
import "./NavBar.css";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedOut() {
    return (
      <Nav className="navbar-nav ml-auto">
        <NavItem>
          <NavLink exact to="/login" className="nav-link">
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact to="/signup" className="nav-link">
            Sign Up
          </NavLink>
        </NavItem>
      </Nav>
    );
  }

  function loggedIn() {
    return (
      <Nav className="navbar-nav ml-auto">
        <NavItem>
          <NavLink exact to="/companies" className="nav-link">
            Companies
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact to="/jobs" className="nav-link">
            Jobs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact to="/profile" className="nav-link">
            Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/" onClick={logout}>
            Log out {currentUser.first_name || currentUser.username}
          </Link>
        </NavItem>
      </Nav>
    );
  }

  return (
    <Navbar className="nav-bar-top" color="light">
      <Nav className="navbar-nav">
        <NavItem>
          <NavLink exact to="/" className="nav-link">
            <h2>Jobly</h2>
          </NavLink>
        </NavItem>
      </Nav>
      {currentUser ? loggedIn() : loggedOut()}
    </Navbar>
  );
}

export default NavBar;
