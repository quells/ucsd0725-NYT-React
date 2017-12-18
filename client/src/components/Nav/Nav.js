import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../Grid";

const Nav = props => (
  <nav className="navbar navbar-inverse navbar-top">
    <Container>
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">
          {props.linkText || "Home"}
        </Link>
      </div>
    </Container>
  </nav>
);

export default Nav;
