import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import EventComponent from '../../components/events/eventComponent';
import ServiceComponent from '../../components/services/serviceComponent';
import TracingComponent from "../../components/seguimiento/tracingComponent"
import ConfigurationComponent from '../../components/configuration/configurationComponent';
import ProjectManagement from '../../components/management/management';
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
                    <Route path ="/admin/events" component={EventComponent}/>
                    <Route path ="/admin/services" component={ServiceComponent}/>
                    <Route path ="/admin/tracing" component={TracingComponent}/>
                    <Route path ="/admin/config" component={ConfigurationComponent}/>
                    <Route path ="/admin/management" component={ProjectManagement}/>
                </Switch>
            </Content>
        )
    }
}

export default ContentPrivate;
