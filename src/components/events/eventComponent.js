import React from 'react';
import { Input, Button, Layout, Row, Col, DatePicker, Upload, Table, message, 
    Modal, Form, Space, TimePicker } from 'antd';
import {UploadOutlined, SaveOutlined , EditOutlined, DeleteOutlined, ShareAltOutlined, PlusOutlined,
    ExclamationCircleOutlined} from '@ant-design/icons';
import moment from 'moment';
import  './eventComponent.css'; 
const {Content} = Layout;
const {TextArea} = Input;
const {confirm} = Modal;
 

class EventComponent extends React.Component {

    constructor(){
        super();

         this.handleDelete = this.handleDelete.bind(this);
    }
    
    state = {
        nameEvent: '',
        description : '',
        date : moment(new Date(), 'YYYY-MM-DD'),
        data : [],
        idEdit: '', // olny is used for edit event
        edit: false,
        visibleModal: false
    };

    setVisibleModal = ()=>{
        this.setState({ visibleModal : true});
    }

    closeModal =() =>{
        this.setState({visibleModal: false});
    }



    handleDelete = recoder =>{
        this.showConfirmDeleteEvent(recoder);
    }

    handleEdit = recoder =>{
        console.log('edit', recoder.idEvents);
        this.setState({
            nameEvent : recoder.eventName,
            description: recoder.eventDescription,
            date: recoder.eventDate,
            idEdit: recoder.idEvents,
            edit: true
        });
        console.log(this.state.nameEvent);
        
    }
        
    showConfirmDeleteEvent(recoder){
        confirm({
            title: 'Deseas eliminar el evento ?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Este evento sera cancelado y quitado de la vista de los usuarios',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'No',
            onOk: ()=>{ this.deleteEvent(recoder.idEvents)}
        });
    }

    deleteEvent(id) {
        const jsonid = {id: id};
        fetch('http://localhost:3005/event/deleteEvent', {
            method: 'POST',
            body: JSON.stringify(jsonid),
            headers:{
                'Content-Type': 'application/json'
            }})
            .then(res=> res.json())
            .then((response)=>{
                if(response.result === 'erased'){
                    message.error('se ha eliminado el evento');
                }
                this.reloadTable();
            });   
    }

    createEvent = ()=>{
        const jsonEvent = {
            nameEvent: this.state.nameEvent,
            description: this.state.description,
            date: this.state.date
        };
        console.log(jsonEvent);    
        fetch('http://localhost:3005/event/createEvent', {
            method: 'POST',
            body: JSON.stringify(jsonEvent),
            headers:{
                'Content-Type': 'application/json'
            }})
            .then(res=> res.json())
            .then((response)=>{
                if(response.result === 'created'){
                    message.success('se ha creado un evento');
                }
                this.reloadTable();
            });
    }

    reloadTable(){
        let data = [];
        fetch('http://localhost:3005/event/getEvents')
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
        this.setState({[e.target.name] : e.target.value})
    }

    onChangeDate = (e, value)=>{
        this.setState({date: value});
    }

    updateEvent = ()=>{
        console.log("updateEvent", this.state.nameEvent);
        const jsonEvent = {
            nameEvent: this.state.nameEvent,
            description: this.state.description,
            date: this.state.date, 
            id: this.state.idEdit};
        console.log(jsonEvent);    
        fetch('http://localhost:3005/event/editEvent', {
            method: 'POST',
            body: JSON.stringify(jsonEvent),
            headers:{
                'Content-Type': 'application/json'
            }})
            .then(res=> res.json())
            .then((response)=>{
                if(response.result === 'edited'){
                    message.success('el evento ha sido editado');
                    this.setState({
                        nameEvent : "",
                        description: "",
                        date: moment(new Date(), 'YYYY-MM-DD'),
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
            button = (<Button  stye={{marginleft: '2%'}}onClick={ this.updateEvent }> <EditOutlined /> Editar Evento</Button> );
        } else{
            button = (<Button type="primary" onClick={ this.createEvent }> <SaveOutlined /> Crear Evento</Button>);
        }

        return button;
    }

    cancelEvent(){
        let button = null;
        if(this.state.edit){
            button = (<Button  onClick={ this.updateEvent }> <EditOutlined /> Cancelar Edicion</Button>);
        }
        return button;
    }

    render(){
        const columns = [
            {
                title: 'Evento',
                dataIndex: 'eventName'
            },
            {
                title: 'Fecha del evento',
                dataIndex: 'eventDate'
            },
            {
                title: 'Descripción',
                dataIndex: 'eventDescription'
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
                    <Col>
                        <Button type="primary" onClick={this.setVisibleModal}><PlusOutlined/> Crear Evento</Button>                       
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <Table rowKey={recoder => recoder.idEvents } columns={columns} dataSource={this.state.data} ></Table>
                    </Col>
                    <Modal visible={this.state.visibleModal} onCancel={this.closeModal}>
                        <Row>
                            <Col span={24}>
                                <Form className="Form_Event">
                                    <Form.Item>
                                            <Input id="input" placeholder="Nombre del evento" value={this.state.nameEvent} name="nameEvent" onChange = {this.onChangeData}/> 
                                    </Form.Item>
                                
                                    <Form.Item>
                                            <DatePicker placeholder="Fecha del evento" defaultValue={moment(this.state.date, 'YYYY-MM-DD')} name="date" onChange={this.onChangeDate}/>
                                    </Form.Item>
                                    
                                    <Form.Item>
                                            <TimePicker placeholder="Hora de inicio" format="HH:mm" defaultValue={moment('12:08', 'HH:mm')}/>
                                    </Form.Item>

                                    <Form.Item>
                                            <TimePicker placeholder="Hora de fin"  format="HH:mm" defaultValue={moment('12:08', 'HH:mm')}/>
                                    </Form.Item>

                                    <Form.Item>
                                            <Input id="input" placeholder="Expositor" value={this.state.nameEvent} name="expositor" onChange = {this.onChangeData}/> 
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
                                        {this.cancelEvent()}
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>  
                    </Modal>
                </Row>
            </Content>
        );
    }
}


export default EventComponent;
