import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./login/register";
import Login from "./login/login";
import Inicio from "./cie/cie";
import Projects from "./projects/projects.js";
import newEvents from './newEvents.js';

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/inicio" component={Inicio}></Route>
        <Route exact path="/inicio/signup" component={Login}></Route>
        <Route exact path="/inicio/signin" component={Register}></Route>
        <Route
          exact
          path="/inicio/projects"
          component={Projects}
        ></Route>
        <Route exact path="/inicio/events" component={newEvents}></Route>
      </Switch>
    );
  }
}
 
// Router path="/inicio" component = {Pblic}
// switch 
// Route <Inicio>
export default Content;
