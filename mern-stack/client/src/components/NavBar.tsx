import React, { SyntheticEvent, useState } from "react";
import {Navbar, Nav, Container} from "react-bootstrap";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import "../styles/navbar.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

const movieReviews = require('../assets/movieReviews.png');

type NavBarProps = {
  expandedCallback: (expanded: boolean) => void;
  expanded: boolean;
}

export default function NavBar(props:NavBarProps) {

  const [expanded, setExpanded] = useState(props.expanded as boolean);

  return (
    <Navbar bg="light" expand="lg" className="dq-navbar" sticky="top" 
    onToggle={
      (next:boolean) => {
        setExpanded(next);
        props.expandedCallback(next);
      }
    } 
    expanded={expanded}>
      <Container 
        // className="navbarContainer"
      >
        <Navbar.Brand as={NavLink} to="/">Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={(e:SyntheticEvent)=>{
          const event = new CustomEvent('onDialogClose', {detail: e.target});
          console.log({detail: e.currentTarget});
          dispatchEvent(event);
        }}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className="dq-navlink">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/create" className="dq-navlink">
              Create Movie Entry
            </Nav.Link>
            <Nav.Link as={NavLink} to="/accordion" className="dq-navlink">
              Accordion View
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/contact" className="dq-navlink">
              Contact
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
