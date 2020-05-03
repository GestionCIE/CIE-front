import React from "react";
import {  BrowserRouter as Router,  Switch, Route } from "react-router-dom";
import history from "./history";

import Public from "../view/Public/public";
import Home from '../view/Home/Home';

function RouterMain() {
  return (
    <Router history={history}>

      <Route path="/inicio" component={Public}></Route>
      <Route path="/admin" component={Home}></Route>

    </Router>
  );
}

export default RouterMain;
