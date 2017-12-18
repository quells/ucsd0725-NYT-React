import React from "react";

import { Container } from "../../components/Grid";

const NoMatch = () => (
  <Container>
    <hr />
    <div className="text-center">
      <h2 style={{"fontSize": "10em"}}>
        <span role="img" aria-label="Confused Face">😕</span>
      </h2>
      <p>
        <span style={{"display": "inline-block"}}>Something went wrong;</span>
        &nbsp;
        <span style={{"display": "inline-block"}}>you're not supposed to be here.</span>
      </p>
    </div>
  </Container>
);

export default NoMatch;
