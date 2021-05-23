import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function TopNav({ setUser }) {
  // function to delete the employee from localstorage
  const logoutHandler = () => {
    window.localStorage.removeItem("loggedEmployee");
    setUser(null);
  };

  return (
    // web app navigation
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/profile">
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/messages">
            <Nav.Link>Messages</Nav.Link>
          </LinkContainer>
          <Nav.Link onClick={logoutHandler}>Log out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
