import React from 'react';
import './Header.css';

import { Layout, Select, Avatar, Tooltip, Space } from 'antd';
import {BellOutlined, SettingOutlined} from '@ant-design/icons';

const { Header } = Layout;
const { Option} = Select;


class HeaderComponent extends React.Component {

    state = {
       projects:[],
       names: [],
       advisor: ''
    };


    getProjects(){
        let data = [];
        fetch('http://localhost:3005/project/getProjects')
            .then(res=> res.json())
            .then((response)=>{
                console.log(response);
                for(let i=0; i < response.result.length; i++){
                    data.push(response.result[i]);
                }
                if(this.state.projects.length == 0) {
                    this.setState({projects: data});
                }
                
            });
    }

    onChangeGetProfiles = (value)=>{
        console.log("value", value);
        if(value > 0) {
            this.getParticipants(value);
        }
    }

    getParticipants(id){
        let data = [];
        fetch(`http://localhost:3005/project/getParticipans?id=${id}`)
            .then(res=> res.json())
            .then((response)=>{
                this.setState({names: response.result.entrepreneurs,
                     advisor: response.result.advisor});
            });
    }

    optionsHeader(){
        let options = null;
        console.log(this.props.path)
        if(this.props.path == '/admin/management'){
            this.getProjects();
            options = (
            <ul className="ul-header">
                <div className="ul-div">
                <Space size={8}>
                <Select defaultValue="Selecione Un Proyecto" style={{marginLeft: '10px'}} onChange={this.onChangeGetProfiles}> 
                    {
                        this.state.projects.length > 0 ?
                          this.state.projects.map((project, index)=>{
                            return <Option value={project.idProject} >{project.projectName}</Option>
                        })
                        :  <Option value="-1">No hay Projectos</Option>
                    }
                    </Select>
                   <div className="div-avatar">
                   <Space size={8}>
                    <span>Emprededores</span> 
                    {
                        this.state.names.map((profile, index)=>{
                            return <Tooltip placement="top" title={profile.name} >
                                        <Avatar >{profile.nameshort}</Avatar>
                                    </Tooltip> 
                        })
                    }
                     <span>Asesor</span> 
                         <Tooltip placement="top" title={this.state.advisor} >
                             <Avatar >{this.state.advisor}</Avatar>
                         </Tooltip>
                    </Space>
                   </div>
                   </Space>
                </div>
                <div className="ul-div">
                    <li className="ul-header-li"> <p> <SettingOutlined className="icon" style={{fontSize: '20px'}} /></p> </li>
                    <li className="ul-header-li"> <p> <BellOutlined className="icon" style={{fontSize: '20px'}} /></p> </li>
                </div>
                
            </ul>

            );
        }else { 
            options = (
            <ul className="ul-header-2">
                <div className="ul-div-2">
                    <li className="ul-header-li"> <p> <SettingOutlined className="icon" style={{fontSize: '20px'}} /></p> </li>
                    <li className="ul-header-li"> <p> <BellOutlined className="icon" style={{fontSize: '20px'}} /></p> </li>
                </div>
            </ul>
            );
        }
        return options;
    }


    render() {
        return (
            <Header className="site-layout-background" style={{ padding: 0 }}>
                {this.optionsHeader()}                    
            </Header>
        )
    }
}

export default HeaderComponent;
