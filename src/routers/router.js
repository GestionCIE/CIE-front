import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from "./history";

import { Public as Home } from "../view/Public/public";

function RouterMain() {
  return (
    <Router history={history}>
      <Route expath="/cie" component={Home}/>
      {/* <Home></Home> */}
    </Router>
  );
}

export default RouterMain;
