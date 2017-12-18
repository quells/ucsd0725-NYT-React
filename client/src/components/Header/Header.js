import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../Grid";

const Header = ({text}) => (
  <nav>
    <Container>
      <h1 className="mt-3 mb-3">
        <Link to="/">
          {text || "Home"}
        </Link>
      </h1>
    </Container>
  </nav>
);

export default Header;
