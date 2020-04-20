import React from "react";
import {
    BrowserRouter as Router,
    Switch, 
    Route,
   // Link
} from "react-router-dom";

import PrincipalComponent from "../components/menu/PrincipalComponent";
import EventComponent from "../components/events/eventComponent";

function RouterMain(){
    return( 
        <Router>
            <PrincipalComponent/>
            <Switch>
                <Route exact path="/events" render={()=> <EventComponent/>}/>
                <Route exact path="/services" render={()=> "Hola services "}/>
                <Route exact path="/tracing" render={()=> "Hola services "}/>
            </Switch>
        </Router>
    );
}

export default  RouterMain ;