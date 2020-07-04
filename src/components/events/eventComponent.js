import React from 'react';
import { Input, Button, Layout, Row, Col, DatePicker, Upload, Table, message, 
    Modal, Form, Space, TimePicker } from 'antd';
import {UploadOutlined, SaveOutlined , EditOutlined, DeleteOutlined, ShareAltOutlined, PlusOutlined,
    ExclamationCircleOutlined} from '@ant-design/icons';
import moment from 'moment';
import  './eventComponent.css';
import eventStatisticsApi from '../../api/common/eventStatistics';
import lasActivitySystemApi from '../../api/common/lastActivitySystem';
import eventImg from '../../assets/event.svg';


const eventS = new eventStatisticsApi();
const lastActivity = new lasActivitySystemApi();

const {Content} = Layout;
const {TextArea} = Input;
const {confirm, success} = Modal;
 

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
        visibleModal: false,
        image: ''
    };

    setVisibleModal = ()=>{
        this.setState({ visibleModal : true});
    }

    onChangeFile = (info) => {

        if(info.file.status == 'done'){
            console.log(info.file.name);
            this.setState({
                image: info.file.name
            })
        }
      

    }

    closeModal =() =>{
        this.setState({visibleModal: false});
    }


    createLastActivitySystem = async (activity) =>{
        lastActivity.createActivitySystem({
            idUser: localStorage.getItem('idUser'),
            activity: activity
        })
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
                    success({content: 'se ha eliminado el evento'});
                }
                this.reloadTable();
            });   
    }

    createEvent = async ()=>{
        const jsonEvent = {
            nameEvent: this.state.nameEvent,
            description: this.state.description,
            date: this.state.date,
            eventImage: this.state.image
        };
        console.log(jsonEvent);    
        fetch('http://localhost:3005/event/createEvent', {
            method: 'POST',
            body: JSON.stringify(jsonEvent),
            headers:{
                'Content-Type': 'application/json'
            }})
            .then(res=> res.json())
            .then(  async (response) => {
                if(response.result === 'created'){
                    console.log("Response -> ", response);
                   const response_statistics = await eventS.createEventStatistics({idEvent: response.id});
                   if(response_statistics == 'created')
                        success({content :'se ha creado un evento'});
                        // await this.createLastActivitySystem("creo un nuevo evento");
                        this.closeModal();
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
        this.setState({date: moment(value,'YYYY-MM-DD')});
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
            // {
            //     title: 'Publicar',
            //     dataIndex: 'publish',
            //     render: (text, recoder)=> <Button type="primary" > <ShareAltOutlined /> Publicar</Button>
            // }


        ];
        return(
            <Content>
                <Row>
                    <Col span={24} style={{marginTop: 0}}>
                        <Row>
                            <Col span={6}>
                                <div className="Div_Content_Event">
                                    <h6>Eventos</h6>
                                    <img className="Img_Event" src={eventImg} />
                                </div>
                            </Col>
                            <Col>
                                <div className="Div_Position">
                                    <Button type="primary" onClick={this.setVisibleModal}><PlusOutlined/> Crear Evento</Button>                       
                                </div>
                            </Col>
                        </Row>
                    </Col>
            
             
                    <Col span={24}>
                        <Table  style={{width: '80%'}} size="small" rowKey={recoder => recoder.idEvents } columns={columns} dataSource={this.state.data} ></Table>
                    </Col>
                    <Modal visible={this.state.visibleModal} title="Eventos" onCancel={this.closeModal}>
                        <Row>
                            <Col span={24}>
                                <Form className="Form_Event">
                                    <Form.Item>
                                            <label>Nombre del evento</label>
                                            <Input id="input" placeholder="Nombre del evento" value={this.state.nameEvent} name="nameEvent" onChange = {this.onChangeData}/> 
                                    </Form.Item>
                                
                                    <Form.Item>
                                            <label>Fecha del evento</label> <br/>
                                            <DatePicker placeholder="Fecha del evento" defaultValue={moment(this.state.date, 'YYYY-MM-DD')} name="date" onChange={this.onChangeDate}/>
                                    </Form.Item>
                                    
                                    <Form.Item>
                                        <   label>Hora de inicio</label> <br/>
                                            <TimePicker placeholder="Hora de inicio" format="HH:mm" defaultValue={moment('12:08', 'HH:mm')}/>
                                    </Form.Item>

                                    <Form.Item>
                                            <label>Hora de fin</label> <br/>
                                            <TimePicker placeholder="Hora de fin"  format="HH:mm" defaultValue={moment('12:08', 'HH:mm')}/>
                                    </Form.Item>

                                    <Form.Item>
                                            <label>Expositor</label> <br/>
                                            <Input id="input" placeholder="Expositor" value={this.state.nameEvent} name="expositor" onChange = {this.onChangeData}/> 
                                    </Form.Item>

                                    <Form.Item>
                                            <label>Descripcion</label> <br/>
                                            <TextArea placeholder="Descripción" value={this.state.description} name="description" onChange={this.onChangeData} allowClear/>  
                                    </Form.Item>
                                    <Form.Item>
                                            <Upload onChange={this.onChangeFile}
                                            name="eventFile"
                                            action="http://localhost:3005/event/uploadFile">
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
