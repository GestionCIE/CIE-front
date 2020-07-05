import React from 'react';
import {Drawer, Row, Col, Avatar, Tooltip, Rate } from  'antd';
import Comments from './comments';
import Http from './../../api/http';

const http = new Http();

class detailActivity extends React.Component {
    state = {
        visibleDrawer: false,
        activity:[],
        commentary: '',
        idActivity: 0,
        description: '',
        resource: '',
        executionWeek: '',
        rate: 1
    };

    async getActivity(){
        const response = await http.get(`project/getActivity?id=${this.props.detailtActivity.id}`)
        const data = response.result[0];

        this.setState({
            description: data.description,
            resource: data.resource,
            executionWeek: data.executionWeek
        })
        
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
                        <div>
                            <span> Nombre: </span> <span> {this.props.detailtActivity.nameActivity}</span> 
                        </div>
                        <div>
                            <span>Description: </span>
                            <p>{this.state.description}</p>
                        </div>
                        <div>
                            <span>Integrantes: </span>
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
                            <label>Semana de ejecucion:</label><br />
                            <p>{this.state.executionWeek}</p>

                        </div>
                        <span>Recursos: </span>
                        <a href={this.state.resource}> Recurso</a>

                        <div>
                             <label>Calificar Actividad</label><br/>
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