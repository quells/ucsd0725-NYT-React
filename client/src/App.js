import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";

const App = () => (
  <Router>
    <div>
      <Nav linkText="NYTimes Search" />
      <Route exact path="/" component={Home} />
    </div>
  </Router>
);

export default App;
