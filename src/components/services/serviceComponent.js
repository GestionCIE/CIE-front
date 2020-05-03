import React from "react";

import { Input, Button, Layout, Row, Col, Upload, Table, message, 
    Modal, Form} from 'antd';
import {UploadOutlined, SaveOutlined , EditOutlined, DeleteOutlined, ShareAltOutlined, 
    ExclamationCircleOutlined } from '@ant-design/icons';
    //import moment from 'moment';

const {Content} = Layout;
const {TextArea} = Input;
const {confirm} = Modal;


class ServiceComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            nameService: '',
            description : '',
            idEdit: '', // olny is used for edit event
            data : [],
            edit: false
        };

         this.handleDelete =  this.handleDelete.bind(this);
         this.handleDelete = this.handleDelete.bind(this);
    }


    handleDelete = recoder =>{
        this.showConfirmDeleteService(recoder);
    }

    handleEdit = recoder =>{
        console.log('edit', this.state.nameService);
        this.setState({
            nameService : recoder.serviceName,
            description: recoder.serviceDescription,
            idEdit: recoder.idServices,
            edit: true
        });

        console.log(this.state.nameService);
        
    }
        
    showConfirmDeleteService(recoder){
        confirm({
            title: 'Deseas eliminar el servicio ?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Este servicio sera cancelado y quitado de la vista de los usuarios',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'No',
            onOk: ()=>{ this.deleteService(recoder.idServices)}
        });
    }

    deleteService(id) {
        const jsonid = {id: id};
        console.log(id);
        fetch('http://localhost:3005/service/deleteService', {
            method: 'POST',
            body: JSON.stringify(jsonid),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(res=> res.json())
            .then((response)=>{;
                
                if(response.result === 'erased'){
                    message.error('se ha eliminado el servicio');
                }
                this.reloadTable();
            });   
    }

    createService = ()=>{
        const jsonService = {
            nameService: this.state.nameService,
            description: this.state.description
        };
        console.log(jsonService);    
        fetch('http://localhost:3005/service/createService', {
            method: 'POST',
            body: JSON.stringify(jsonService),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(res=> res.json())
            .then((response)=>{
                if(response.result === 'created'){
                    message.success('se ha creado un Servicio');
                }
                this.reloadTable();
            });
    }

    reloadTable(){
        let data = [];
        fetch('http://localhost:3005/service/getServices')
            .then(res=> res.json())
            .then((response)=>{
                console.log(response);
                for(let i=0; i < response.result.length; i++){
                    data.push(response.result[i]);
                }
                this.setState({data: data});
                
            });
    }

    componentDidMount(){
       this.reloadTable();
    }

    onChangeData = (e)=>{
        console.log( e.target.name);
        console.log(e.target.value);
        this.setState({[e.target.name] : e.target.value})
    }

   /* onChangeDate = (e, value)=>{
        this.setState({date: value});
    }*/

    updateService = ()=>{
        console.log("updateService", this.state.nameService);
        const jsonService = {
            nameService: this.state.nameService,
            description: this.state.description,
            //date: this.state.date, 
            id: this.state.idEdit};
        console.log(jsonService);    
        fetch('http://localhost:3005/service/editService', {
            method: 'POST',
            body: JSON.stringify(jsonService),
            headers:{
                'Content-Type': 'application/json'
            }})
            .then(res=> res.json())
            .then((response)=>{
                if(response.result === 'edited'){
                    message.success('el servicio ha sido editado');
                    this.setState({
                        nameService : "",
                        description: "",
                        //date: moment(new Date(), 'YYYY-MM-DD'),
                        idEdit: "",
                        edit: false
                    });
                }
                this.reloadTable();
            });
    }

    howIsButton(){
        let button = null;
        console.log("state", this.state.edit);
      
      
        if(this.state.edit){
            button = (<Button  stye={{marginleft: '2%'}}onClick={ this.updateService }> <EditOutlined /> Editar Servicio</Button> );
        } else{
            button = (<Button type="primary" onClick={ this.createService }> <SaveOutlined /> Crear Servicio</Button>);
        }

        return button;
    }

    cancelService(){
        let button = null;
        if(this.state.edit){
            button = (<Button  onClick={ this.updateService }> <EditOutlined /> Cancelar Edicion</Button>);
        }
        return button;
    }

   

    render(){
        const columns = [
            {
                title: 'Servicio',
                dataIndex: 'serviceName'
            },
            {
                title: 'Descripción',
                dataIndex: 'serviceDescription'
            },
            {
                title: 'Editar',
                dataIndex: 'edit',
                render: (text, recoder)=>( <Button  onClick={() => this.handleEdit(recoder)}> <EditOutlined /> Editar</Button>)
            }, 
            {
                title: 'Eliminar',
                dataIndex: 'delete',
                render: (text, recoder)=>( <Button type="danger" onClick={() => this.handleDelete(recoder)}> <DeleteOutlined>/</DeleteOutlined> Eliminar</Button>)
            }, 
            {
                title: 'Publicar',
                dataIndex: 'publish',
                render: (text, recoder)=> <Button type="primary" > <ShareAltOutlined /> Publicar</Button>
            }


        ];
        return(
            <Content>
                <Row>
                    <Col span={7} >
                          <Form>
                              <Form.Item>
                                    <Input id="input" placeholder="Nombre del servicio" value={this.state.nameService} name="nameService" onChange = {this.onChangeData}/> 
                              </Form.Item>

                              <Form.Item>
                                    <TextArea placeholder="Descripción" value={this.state.description} name="description" onChange={this.onChangeData} allowClear/>  
                              </Form.Item>
                              <Form.Item>
                                    <Upload>
                                        <Button>
                                        <UploadOutlined/> Subir Archivo
                                        </Button>
                                    </Upload>   
                              </Form.Item>

                              <Form.Item>
                                   {this.howIsButton()}
                                   {this.cancelService()}
                              </Form.Item>
                          </Form>
                    </Col>
                    <Col span={16} push={1}>
                        <Table rowKey={recoder => recoder.idServices } columns={columns} dataSource={this.state.data} ></Table>
                    </Col>
                </Row>
        
            </Content>
        );
    }
}
export default ServiceComponent;