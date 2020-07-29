import React from 'react';
import { Input, Button, Layout, Row, Col, DatePicker, Upload, Table, message, 
    Modal, Form, Space, TimePicker, Steps, Divider } from 'antd';
import {UploadOutlined, SaveOutlined , EditOutlined, DeleteOutlined, ShareAltOutlined, PlusOutlined,
    ExclamationCircleOutlined} from '@ant-design/icons';
import moment from 'moment';
import  './eventComponent.css';

import lasActivitySystemApi from '../../api/common/lastActivitySystem';
import eventImg from '../../assets/event.svg';
import Http from './../../api/http';
import FacebookPost from '../facebook/facebookPost';

const lastActivity = new lasActivitySystemApi();
const http = new Http();
const {Content} = Layout;
const {TextArea} = Input;
const {confirm, success} = Modal;
const {Step}= Steps;



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
        image: '',
        current: 0
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
        this.setState({visibleModal: false, current: 0});
    }


    createLastActivitySystem = async (activity) =>{
        lastActivity.createActivitySystem({
            idUser: localStorage.getItem('idUser'),
            activity: activity
        });
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

    async deleteEvent(id) {
        const jsonid = {id: id};

        const response = await http.post('event/deleteEvent', jsonid);
        if(response.result === 'erased'){
            success({content: 'Se ha eliminado el evento'});
            this.reloadTable();

        } 
    }

    createEvent = async ()=>{
        const jsonEvent = {
            nameEvent: this.state.nameEvent,
            description: this.state.description,
            date: this.state.date,
            eventImage: this.state.image
        };
        const response = await http.post('event/createEvent', jsonEvent);
        if(response.result  === 'created') {
            const response_statistics = await http.post('event/createEventStatistics', {idEvent: response.id} );
            if(response_statistics.result == 'created')
                success({content :'se ha creado un evento'});
            this.closeModal();
            this.reloadTable();
        } 
    }

    async reloadTable(){
        let data = [];
        const response = await http.get('event/getEvents');
        for(let i=0; i < response.result.length; i++){
            data.push(response.result[i]);
        }
        this.setState({data: data});
    }

    componentDidMount(){
       this.reloadTable();
    }

    onChangeData = (e)=>{
        this.setState({[e.target.name] : e.target.value})
    }

    onChangeDate = (e, value)=>{
        console.log(value);
        this.setState({date: value});
    }

    updateEvent = async ()=>{
        console.log("updateEvent", this.state.nameEvent);
        const jsonEvent = {
            nameEvent: this.state.nameEvent,
            description: this.state.description,
            date: this.state.date, 
            id: this.state.idEdit};
        console.log(jsonEvent);  
        const response = await http.post('event/editEvent', jsonEvent);
        if(response.result === 'edited') {
            message.success('el evento ha sido editado');
            this.setState({
                nameEvent : "",
                description: "",
                date: moment(new Date(), 'YYYY-MM-DD'),
                idEdit: "",
                edit: false
            });
            this.closeModal();
            this.reloadTable();
        }  
    }

    howIsButton(){
        let button = null;
        console.log("state", this.state.edit);
      
      
        if(this.state.edit){
            button = (<Button  stye={{marginleft: '2%'}} className="Form_Event_Button" onClick={ this.updateEvent }> <EditOutlined /> Editar Evento</Button> );
        } else{
            button = (<Button type="primary" className="Form_Event_Button" onClick={ this.createEvent }> <SaveOutlined /> Crear Evento</Button>);
        }

        return button;
    }

    handleCancelEvent = () =>{
        this.closeModal();

        this.setState({
            edit: false
        });
    }

    cancelEvent(){
        let button = null;
        if(this.state.edit){
            button = (<Button className="Form_Event_Button"  onClick={ this.handleCancelEvent }> <EditOutlined /> Cancelar Edicion</Button>);
        }
        return button;
    }

    contentForm = () => (
        <Form className="Form_Event">
        <Form.Item>
                <label>Nombre del evento</label>
                <Input id="input" placeholder="Nombre del evento" value={this.state.nameEvent} name="nameEvent" onChange = {this.onChangeData}/> 
        </Form.Item>
    
        {/* <Form.Item>
              
        </Form.Item> */}
        
        <Form.Item>
        <label>Hora de inicio y fin</label> <br/>
            <div className="Form_Event_Hour">
                <Space size={8}>
                   
                    <TimePicker placeholder="Hora de inicio" format="HH:mm" defaultValue={moment('12:08', 'HH:mm')}/>
                    {/* <label>Hora de fin</label> <br/> */}
                    <TimePicker placeholder="Hora de fin"  format="HH:mm" defaultValue={moment('12:08', 'HH:mm')}/>
                </Space>
            </div>
           
        </Form.Item>

        {/* <Form.Item>
              
        </Form.Item> */}

        <Form.Item>
                <label>Expositor</label> <br/>
                <Input id="input" placeholder="Expositor" value={this.state.nameEvent} name="expositor" onChange = {this.onChangeData}/> 
        </Form.Item>

        <Form.Item>
                <label>Descripcion</label> <br/>
                <TextArea placeholder="Descripción" value={this.state.description} name="description" onChange={this.onChangeData} allowClear/>  
        </Form.Item>
        <Form.Item>
            <div className="Form_Event_Group">
            <label>Fecha del evento</label> <br/>
            <Space size={8}>
                <DatePicker placeholder="Fecha del evento" value={moment(this.state.date, 'YYYY-MM-DD')} name="date" onChange={this.onChangeDate}/>
                <Upload onChange={this.onChangeFile}
                    name="eventFile"
                    action="http://localhost:3005/event/uploadFile">
                        <Button>
                        <UploadOutlined/> Subir Archivo
                        </Button>
                </Upload> 
            </Space>
            </div>
        </Form.Item>

        <Form.Item>
            {this.howIsButton()}
            {this.cancelEvent()}
        </Form.Item>
    </Form>
    );

    postFacebook = () => (<FacebookPost image={this.state.image} />)

    next(){
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev(){
        const current = this.state.current - 1;
        this.setState({ current });
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

        const steps = [
            {
                title: 'Crear Evento',
                content: this.contentForm
            },
        
            {
                title: 'Publicar Evento',
                content: this.postFacebook
            }
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
                    <Modal footer={false} visible={this.state.visibleModal} title="Eventos" onCancel={this.closeModal}>
                        <Row>
                            <Col span={24}>
                                <Steps current={this.state.current} >
                                    {steps.map(item => (
                                    <Step key={item.title} title={item.title} />))
                                    }
                                </Steps>
                                <div>{steps[this.state.current].content()}</div>
                                <Divider type="horizontal"/>
                                <div>
                                    {this.state.current < steps.length -1 && (<Button type="primary" onClick={() => this.next()}>Siguiente</Button>)}
                                    {this.state.current === steps.length -1 && (<Button type="primary" onClick={() => this.closeModal()}> Completar </Button>)}
                                    {this.state.current > 0 && (<Button type="primary"  style={{ margin: '0 8px' }} onClick={() => this.prev()}>Anterior</Button>)}
                                </div>
                            </Col>
                        </Row>  
                    </Modal>
                </Row>
            </Content>
        );
    }
}


export default EventComponent;
