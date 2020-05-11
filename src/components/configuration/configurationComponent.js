import React from 'react';
import {Layout, Row, Col, Table, Button, Select, message, Collapse, List, Switch} from 'antd';
import configurationApi from './../../api/configuration/configurationApi';
const {Option} = Select; 
const {Content} = Layout;
const {Panel} = Collapse;
const api = new configurationApi(); 
class configurationComponent  extends React.Component{

    state = {
        data: [],
        moduleAdviser: [],
        moduleAssistant: [],
        moduleEntrepreneur: []

    };

    componentDidMount(){
        this.getAllUsers();
        this.getSystemModules();
    }

    getAllUsers(){
        let data = [];
        fetch('http://localhost:3005/users/admin/getAllUsers')
            .then(res=> res.json())
            .then((response)=>{
                
                for(let i=0; i < response.result.length; i++){
                    data.push(response.result[i]);
                }
               
                this.setState({data: data});
            });
            
    }

    getRole(role){
        let span = <Button>Editar</Button>;
        console.log(role);
        if(role == 'role-pending'){
            span = <span> Pendiente de asignacion </span>
        }else if (role == 'entrepreneur'){
            span = <span> Emprendedor </span>
        }else if (role == 'adviser') {
            span = <span> Asesor </span>
        }else if (role === 'assistant'){
            span = <span> Asistente </span>
        }else if(role == 'administrator'){
            span = <span> Administrador </span>
        }else {
            span = <span> Sin rol </span>
        }

        return span;
    }

    setNewRole = (value)=>{
        
        const data = {role: value.split(' ')[0], id: value.split(' ')[1] };
        fetch('http://localhost:3005/users/admin/updateRole', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }})
            .then(res=> res.json())
            .then((response)=>{
                console.log(response);
                if(response.result == 'edited'){
                    message.success('Ha cambiado correctamente el rol del usuario');
                    this.getAllUsers();
                }

            });
    }
    createSelectOption(id){
        console.log(id);
        let select = <Select defaultValue="Selecionar Rol" onChange={this.setNewRole}> 
            <Option value={`adviser ${id}`}>Asesor</Option>
            <Option value={`assistant ${id}`}>Asistente</Option>
            <Option value={`administrator ${id}`}>Administrador</Option>
        </Select>; 
        return select;
    }

    async getSystemModules(){
       const response = await api.getAllSystemModules();

       this.setState({moduleAdviser : response.result.adviser, 
        moduleAssistant: response.result.assistant,
        moduleEntrepreneur: response.result.entrepreneur});
    }

     deactivate = async (state, id)=> {

        const response = await api.updateVisibleModule({visible: state, id: id });
        if(response.result == 'edited') {
            message.success("Se cambio el estado del modulo");
            this.getSystemModules();
        }
    }

    render(){
        const columns = [{
            title: 'Nombre',
            dataIndex: 'name'
        },
        {
            title: 'Usuario',
            dataIndex: 'username'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },        
        {
            title: 'Rol del usuario',
            dataIndex: 'role',
            render: (text, recoder)=>( this.getRole(recoder.role) )

        },
         {
            title: 'Asignar Nuevo rol',
            render: (text, recoder) =>( this.createSelectOption(recoder.idUsers) )
        }];
        return(
        <Content>
            <Row>
                <Col span={12}>
                    <Table size="small" rowKey={ recoder => recoder.idUsers} columns={columns} dataSource={this.state.data}/>            
                </Col>
                <Col offset={3}>
                    <Collapse accordion>
                        <Panel header="Activacion de los Modulo del Asistente">
                        <List dataSource={this.state.moduleAssistant}
                            renderItem={item => (
                                <List.Item>
                                    <span>{item.name}</span>
                                    <Switch key={item.idSystemModules} onChange={(e)=>this.deactivate(e, item.id )} checked={item.active} />
                                </List.Item>
                            )}
                        />
                        </Panel> 
                    </Collapse>
                    <Collapse accordion>
                        <Panel header="Activacion de los Modulo del asesor">
                        <List dataSource={this.state.moduleAdviser}
                            renderItem={item => (
                                <List.Item>
                                    <span>{item.name}</span>
                                    <Switch key={item.idSystemModules} onChange={(e)=>this.deactivate(e, item.id )} checked={item.active} />
                                </List.Item>
                            )}
                        />
                        </Panel> 
                    </Collapse>
                    <Collapse accordion>
                        <Panel header="Activacion de los Modulo del emprendedor">
                        <List dataSource={this.state.moduleEntrepreneur}
                            renderItem={item => (
                                <List.Item>
                                    <span>{item.name}</span>
                                    <Switch key={item.idSystemModules} onChange={(e)=>this.deactivate(e, item.id )} checked={item.active} />
                                </List.Item>
                            )}
                        />
                        </Panel> 
                    </Collapse>
                </Col>
            </Row>
        </Content>
        );
    }

}


export default configurationComponent;