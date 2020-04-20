import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
   // Link
} from "react-router-dom";
import Home from '../View/Home/Home';
import PrincipalComponent from "../components/menu/PrincipalComponent";

function RouterMain(){
    return(
        <Router>
            <Switch>
                <Route path="/" component={Home}/>
                {/*<Route exact path="/services" render={()=> "Hola services "}/>*/}
                {/*<Route exact path="/tracing" render={()=> "Hola services "}/>*/}
            </Switch>
        </Router>
    );
}

export default  RouterMain ;
