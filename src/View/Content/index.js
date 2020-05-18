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
            case 'Gestion de proyectos':
                htmlComponent = <ProjectManagement idProject={this.props.idProject} />
                
                break;
            case 'Eventos':
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
            
                default:
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
            }}>
                <Switch>
                    {/* <Route path ="/admin/events" component={EventComponent}/>
                    <Route path ="/admin/services" component={ServiceComponent}/>
                    <Route path ="/admin/tracing" component={TracingComponent}/>
                    <Route path ="/admin/config" component={ConfigurationComponent}/>
                    <Route path ="/admin/management" render={()=><ProjectManagement idProject={this.props.idProject} />}/>
                    <Route path = "/admin/proyect" component={ProjectComponent}/> */}
                    {
                        this.state.modules.map(e =>{
                            if(e.idSystemModules == 1 ){
                               return  <Route path ={e.route} render={()=><ProjectManagement idProject={this.props.idProject} /> }/> 
                            }else{
                               return  <Route path={e.route} component={this.getComponent(e.nameModule)} />
                            }
                          
                        })
                    }
                </Switch>
            </Content>
        )
    }
}

export default ContentPrivate;
