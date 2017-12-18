import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav linkText="NYTimes Search" />
    </div>
  </Router>
);

export default App;
