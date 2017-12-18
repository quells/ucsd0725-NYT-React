import React, { Component } from "react";

import { Container } from "../../components/Grid";

class Saved extends Component {
  state = {
    saved: []
  };

  render() {
    return (
      <Container>
        <hr />
        <div>
          <h2>Saved Articles</h2>
          {this.state.saved.length ?
            (
              <h3>All these saved articles</h3>
            ) : (
              <h3>No Saved Articles</h3>
            )
          }
        </div>
      </Container>
    );
  }
}

export default Saved;
