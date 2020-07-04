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
const {  Content } = Layout;



class ContentPrivate extends React.Component {

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

      getComponent(component){
        let htmlComponent = null;
        switch (component) {

            case 'Inicio':
                htmlComponent =  GeneralComponent;
            break;
            case 'Gestion de proyectos':
                htmlComponent = <ProjectManagement />
                
                break;
            case 'Eventos':
                console.log("asignado");
                htmlComponent = EventComponent;
                break;

                case 'Servicios':
                    htmlComponent = ServiceComponent;
                    break;

                case 'Seguimiento':
                    htmlComponent = TracingComponent;
                    break;

                case 'Configuracion':
                    htmlComponent = ConfigurationComponent
                    break;
                
                case 'Config de Proyectos':
                    htmlComponent = ProjectComponent;
                    break;
                
                case 'Trazabilidad de eventos':
                    htmlComponent = EventComponent;
                break;

                case 'Asistencia':
                    htmlComponent = Assistance; 
                break;


                default:
                    console.log("entre");
                    break;
            }
            return htmlComponent;
      }

    componentDidMount(){
        this.getModulesByRole();
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
            </Content>
        )
    }
}

export default ContentPrivate;
