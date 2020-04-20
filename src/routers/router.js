import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from '../View/Home/Home';


function RouterMain(){
    return(
        <Router>
            <Switch>
                <Route path="/" component={Home}/>
            </Switch>
        </Router>
    );
}

export default  RouterMain ;
