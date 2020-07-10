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
import ProjectComponent from "../../components/proyect/ProyectComponent";
import Assistance from '../../components/assistance/assistance';
import GeneralComponent from '../../components/general/general';
import ProfileComponent from '../../components/profile/profile';
import ProjectTrace from '../../components/projectTrace/projectTrace';
import { Layout } from 'antd';

import {SocketContext} from './../../routers/context';

const {  Content } = Layout;




class ContentPrivate extends React.Component {
    static contextType = SocketContext;
    state = {
        modules : []
    };
   
    getModulesByRole(){
        fetch(`http://localhost:3005/config/getModulesByRole?role=${localStorage.getItem("role")}`)
        .then(res =>res.json())
        .then((response) =>{
          console.log(response);
          this.setState({modules: response.result});
        });
      }

    componentDidMount(){
        this.getModulesByRole();
        console.log(this.context);
        this.registerUser();
    }

    registerUser() {
        const {socket} =  this.context;
        const data = {
            username:  localStorage.getItem('username')
        }
        socket.emit('/registerUser', data);

    }

    render() {
        return (
            
            <Content  
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: '85vh',
              maxHeight: '100vh'
            }}>
                <SocketContext.Consumer>
                    {
                        (context) => (
                            <Switch>
                                <Route path ="/admin/events" component={EventComponent}/>
                                <Route path ="/admin/services" component={ServiceComponent}/>
                                <Route path ="/admin/tracing" component={TracingComponent}/>
                                <Route path ="/admin/config" component={ConfigurationComponent}/>
                                <Route path ="/admin/management" render={()=><ProjectManagement idProject={this.props.idProject} />}/>
                                <Route path = "/admin/proyect" component={ProjectComponent}/>
                                <Route path= "/admin/assistance" component={Assistance}/>
                                <Route path="/admin/profile" render={()=><ProfileComponent handle={this.props.handleImage}/>}/>
                                <Route path="/admin/trazproject" component={ProjectTrace} />
                                <Route path="/admin" component={GeneralComponent}/>
                            </Switch>
                        )
                    }
                </SocketContext.Consumer>
            </Content>
        )
    }
}

export default ContentPrivate;
