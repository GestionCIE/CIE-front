import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import EventComponent from '../../components/events/eventComponent';


class index extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path ="/events" component={EventComponent}/>
                </Switch>
            </div>
        )
    }
}

export default index;
