import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import history from "./history";

import Public from "../pages/landing/public";
import Home from "../pages/page";

function RouterMain() {
  return (
    <Router history={history}>
      <Route path="/inicio" component={Public} />
      <Route path="/dashboard" component={Home} />
    </Router>
  );
}

export default RouterMain;
