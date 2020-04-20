import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import EventComponent from '../../components/events/eventComponent';
import ServiceComponent from '../../components/services/serviceComponent';

class index extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path ="/events" component={EventComponent}/>
                    <Route path ="/services" component={ServiceComponent}/>
                </Switch>
            </div>
        )
    }
}

export default index;
