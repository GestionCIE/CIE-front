import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import Register from "./login/register";
import Login from "./login/login";
import Inicio from "./cie/cie";
import Projects from "./projects/projects.js";
import newEvents from './newEvents.js';
import Advisers from './advisers';
import Home from './../page';
import history from './../../routers/history';
class Content extends React.Component {
  render() {
    return (
      <>
      <Switch>
        <Route exact path="/" component={Inicio}></Route>
        <Route exact path="/signup" component={Login}></Route>
        <Route exact path="/signin" component={Register}></Route>
        <Route
          exact
          path="/projects"
          component={Projects}
        ></Route>
        <Route exact path="/events" component={newEvents}></Route>
        <Route exact path="/advisers" component={Advisers}></Route>
      </Switch>
      <Router history={history}>
        <Route   path="/admin" component={Home}></Route>
      </Router>
      </>
    );
  }
}
 
// Router path="/inicio" component = {Pblic}
// switch 
// Route <Inicio>
export default Content;
