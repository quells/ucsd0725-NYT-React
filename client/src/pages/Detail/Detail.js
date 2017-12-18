import React from "react";

import { Container } from "../../components/Grid";

const Detail = ({match}) => (
  <Container>
    <p>{match.params.id}</p>
  </Container>
);

export default Detail;
