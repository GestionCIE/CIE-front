import React from "react";
import {  BrowserRouter as Router,  Switch, Route } from "react-router-dom";
import history from "./history";

import Public from "../view/Public/public";
import Home from '../view/Home/Home';
// import Register from '../view/Public/login/register';
// import Login from '../view/Public/login/login';
// import Inicio from '../view/Public/cie/cie';
// import ContentPrivate from '../view/Content/index';
function RouterMain() {
  return (
    <Router history={history}>
    {/* <Switch> */}
      {/* <Route path="/" component={Public}></Route> */}
      <Route path="/inicio" component={Public}></Route>
      <Route path="/admin" component={Home}></Route>
      {/* <Route exact path="/cie" component={Inicio}></Route> */}
      {/* <Route exact path="/signup" component={Login}></Route>
      <Route exact path="/signin" component={Register}></Route> */}
      {/* </Switch> */}
    </Router>
  );
}

export default RouterMain;
