import React from 'react';
import {Row, Col, Table, Collapse, List, Select, Switch, Button, Modal} from 'antd';
import Http from './../../api/http';

const http = new Http();
const {Panel} = Collapse;
const {Option} = Select; 
const {success, confirm} = Modal;

class RoleSettings extends React.Component {
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

    async getAllUsers(){
        let data = [];  
        const response = await http.get('users/admin/getAllUsers');
        for(let i=0; i < response.result.length; i++){
            data.push(response.result[i]);
        }
        this.setState({data: data});
            
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

    setNewRole = async (value)=>{
        
        const data = {role: value.split(' ')[0], id: value.split(' ')[1] };
        const response = await http.post('users/admin/updateRole', data);
        if(response.result === 'edited') {
            success({content: 'Ha cambiado correctamente el rol del usuario'});
            this.getAllUsers();
        }
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
       const response = await http.get('config/getSystemModules');

       this.setState({moduleAdviser : response.result.adviser, 
        moduleAssistant: response.result.assistant,
        moduleEntrepreneur: response.result.entrepreneur});
    }

     deactivate = async (state, id)=> {
        const data = {visible: state, id: id };
        const response = await http.post('config/updateVisible', data);
        if(response.result == 'edited') {
            success({content : "Se cambio el estado del modulo"});
            this.getSystemModules();
        }
    }
    
    deleteUser = (id) => {
        const deleteOk = async () => {
            const response = await http.post('config/deleteUser', {id: id});
            if(response.result === 'erased'){
                success({content: 'Se ha eliminado el usuario del sistema'});
                this.getAllUsers(); 
            }     
        }

        confirm({title: 'Eliminar usuario', content: '¿Desea eliminar este usuario?', onOk:deleteOk})
    }

    deleteButton = (id) => {
        return (<Button type="danger" onClick={() =>this.deleteUser(id)}>Eliminar usuario</Button>)
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
        },
        
        {
            title: 'Eliminar Usuario',
            render: (text, recoder) => ( this.deleteButton(recoder.idUsers))
        }];

        return(
            <>
            <Row>
            <Col span={17}>
                <h6>Roles de usuario</h6>
                <Table size="small" rowKey={ recoder => recoder.idUsers} columns={columns} dataSource={this.state.data}/>            
            </Col>
            </Row>
            <Row>
            <Col span={6}>
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
            </>
        )
    }
}

export default RoleSettings;