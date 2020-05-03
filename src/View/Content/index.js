import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import EventComponent from '../../components/events/eventComponent';
import ServiceComponent from '../../components/services/serviceComponent';
import { Layout } from 'antd';
const {  Content } = Layout;



class ContentPrivate extends React.Component {
    render() {
        return (
 
            <Content  
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}>

            <Switch>
                <Route exact path ="/admin/events" component={EventComponent}/>
                <Route exact path ="/admin/services" component={ServiceComponent}/>
            </Switch>
            </Content>
        )
    }
}

export default ContentPrivate;
