import React from "react";
import {
    BrowserRouter as Router,
    Switch, 
    Route,
   // Link
} from "react-router-dom";


function RouterMain(){
    
    return( 
        <Router>
            <Switch>
                <Route exact path="/events" render={()=> "Hola"}/>
            </Switch>
        </Router>
    );
}

export default  RouterMain ;