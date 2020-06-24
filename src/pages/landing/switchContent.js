import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./login/register";
import Login from "./login/login";
import Inicio from "./cie/cie";
import QuienesSomos from "./about/QuienesSomos";

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/inicio" component={Inicio}></Route>
        <Route exact path="/inicio/signup" component={Login}></Route>
        <Route exact path="/inicio/signin" component={Register}></Route>
        <Route
          exact
          path="/inicio/quienessomos"
          component={QuienesSomos}
        ></Route>
      </Switch>
    );
  }
}

export default Content;
