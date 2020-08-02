import React from 'react';
import {Drawer, Space, Modal , Row, Col, Avatar, Tooltip, Rate, Progress, Button, Select } from  'antd';
import {MinusOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import Comments from './comments';
import Http from './../../api/http';
import {getNameResource} from './../../utils/utils';

const http = new Http();
const {success, confirm } = Modal;
class detailActivity extends React.Component {
    state = {
        visibleDrawer: false,
        activity:[],
        commentary: '',
        idActivity: 0,
        description: '',
        resource: '',
        executionWeek: '',
        rate: 1,
        percentaje: 0,
        state: ''
    };


    async getActivity(){
        const response = await http.get(`project/getActivity?id=${this.props.detailtActivity.id}`)
        const data = response.result[0];

        this.setState({
            description: data.description,
            resource: data.resources,
            executionWeek: data.executionWeek,
            percentaje: data.percentaje == undefined ? 0 : data.percentaje,
            state:  data.state
        });
        
        console.log("response >>>" , response);

    }

    componentDidUpdate(){

        if(this.props.detailtActivity.id != this.state.idActivity) {
            console.log(this.props.detailtActivity);
            this.getActivity();
            this.setState({
                idActivity: this.props.detailtActivity.id
            });
        }   
    }

    componentDidMount() {
        this.getActivity();
    }

    onChangeRate = (number) => {

        console.log("rate >>> ", number);
        
        this.addRate(number);
    }

    async addRate(number) {
        const data = {
            rate: number,
            id: this.props.detailtActivity.id
        }
        const response = await http.post('project/updateRate', data);
        this.setState({
            rate: number
        });
        console.log("rate update >>>" , response);

    }

    increase = () => {
        let percentaje = this.state.percentaje + 1;
        if (percentaje > 100) {
            percentaje = 100;
        }

        this.updatePercentaje({id : this.props.detailtActivity.id, percentaje});
        console.log(this.props.idProject, " ", this.props.phase);
        this.props.reloadActivities(this.props.idProject, this.props.phase, 1);
        this.setState({ percentaje });
    };

    decline = () => {
        let percentaje = this.state.percentaje - 1;
        if (percentaje < 0) {
            percentaje = 0;
        }

        this.updatePercentaje({id : this.props.detailtActivity.id, percentaje});
        console.log(this.props.idProject, " ", this.props.phase);
        this.props.reloadActivities(this.props.idProject, this.props.phase, 1);
        this.setState({ percentaje });
    };

    async updatePercentaje(data) {
        const response = await http.post('project/percentaje', data);
        console.log(response);
    }


    getStates = (value)=>{
        
        const state = value[0];
        if(state != undefined){
            this.updateState(state);
            this.setState({state: state});
        }
    }

    async updateState(value){
        const response = await http.post('project/state', 
        {id: this.props.detailtActivity.id, state: value[0]});
        this.props.reloadActivities(this.props.idProject, this.props.phase, 1);
        console.log(response);
    }

    async deleteActivity(){
        const response = await http.post('project/deleteActivity', 
        {id: this.props.detailtActivity.id});
        if(response.result == 'erased'){
            success({
                content: 'Se ha borrado la actividad correctamente'
            });
            this.props.reloadActivities(this.props.idProject, this.props.phase, 1);
            this.props.closeDrawer();
        }
    }

    delete = () => {
        confirm({
            title: 'Deseas eliminar la actividad ?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Esta actividad se eliminara del proyecto',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'No',
            onOk: ()=>{ this.deleteActivity()}
        });
    }


    render(){
        return( <Drawer width="40%"
        title="Detalle de la actividad"
        placement="right"
        closable={false}
        onClose={this.props.closeDrawer}
        visible={this.props.visibleDrawer}
        >
            <Row>
                <Col span={24}>
                    <div className="Drawer_Content">
                        <div className="Drawer_Content_Div">
                            <div>
                            <h6> Nombre: </h6> <p> {this.props.detailtActivity.nameActivity}</p> 
                            </div>
                          
                            <Button type="danger" icon={<DeleteOutlined />} onClick={this.delete}>Eliminar Actividad</Button>
                        </div>
                        <div>
                            <h6>Description: </h6>
                            <p>{this.state.description}</p>
                        </div>
                        <div>
                            <h6>Integrantes: </h6>
                             {
                               
                                 this.props.detailtActivity.profile.map(e => {
                                    return (
                                    <Tooltip placement="top" title={e.responsable}>
                                        <Avatar>
                                                {e.nameshort}
                                        </Avatar>
                                     </Tooltip>) 
                                 }) 
                             }

                        </div>
                        <div>
                            <h6>Estado de la actividad</h6>
                            {this.props.getState(this.state.state)}
                            <Space size={8}>
                                
                                <Progress type="circle" width={40} percent={this.state.percentaje} />
                                <Button.Group>
                                <Button onClick={this.decline} icon={<MinusOutlined />} />
                                <Button onClick={this.increase} icon={<PlusOutlined />} />
                                </Button.Group>
                                
                                <Select 
                        
                                    mode="multiple"
                                    style={{ minWidth: '200px' }}
                                    placeholder="Progreso"
                                    onChange={this.getStates}>                        
                                    {this.props.getOptionState()}
                                </Select>
                            </Space>
                        </div>
                        <div>
                            <h6>Semana de ejecucion:</h6><br />
                            <p>{this.state.executionWeek}</p>

                        </div>
                        <h6>Recursos: </h6>
                            <a href={this.state.resource} download> {getNameResource(this.state.resource)}</a>

                        <div>
                             <h6>Calificar Actividad</h6><br/>
                             <Rate value={this.state.rate} count={4} onChange={this.onChangeRate}/>
                        </div>
                            
                        <div>
                             <Comments idActivity={this.props.detailtActivity.id}/>
                        </div>
                    </div>
                </Col>
            </Row>
        </Drawer>)
    
    }
}   

export default detailActivity;