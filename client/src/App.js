import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header  from "./components/Header";
import Search  from "./pages/Search";
import Saved   from "./pages/Saved";
import NoMatch from "./pages/NoMatch";

const App = () => (
  <Router>
    <div>
      <Header text="NYTimes Search" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/saved" component={Saved} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

const Home = () => (
  <div>
    <Search />
    <Saved />
  </div>
);

export default App;
