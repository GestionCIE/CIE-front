import React from 'react';
import {Row, Col, Select, Table, Checkbox} from 'antd';
import assistenceApi from '../../api/assistance/assistanceApi';
import './assistance.css';
const {Option} = Select;
const api = new assistenceApi();

class Assistance extends React.Component{

    state = {
        events : [],
        attendance: []
    };

    componentDidMount(){
        this.getAllEvents();
    }

    getAllEvents = async ()=>{
        const response = await api.getAllEvents();
        this.setState({events:  response.result});
    }

    getAssistenceByEvent = async (value) => {

        const response =  await api.getAttendanceByEvent({id: value});
        console.log(response);
        this.setState({attendance: response.result});
    }

    addAttendance =async (e, id)=>{
        console.log(e.target.checked);
        const response = await api.updateAttendance({id: id, attended: e.target.checked});
        console.log(response);
        if(response.result == 'edited')
          
            this.getAssistenceByEvent(id);
    }

    render() {
        const columns = [
            {
                title: 'Asistencia',
                dataIndex: 'attended',
                render: (text, recoder)=> <Checkbox  checked={recoder.attended} onChange={(e)=>{this.addAttendance(e, recoder.idEvent)}}> Asistio </Checkbox>
            },
            {
                title: 'Nombre del invitado',
                dataIndex: 'fullName'
            },
            {
                title: 'Relacción con la universidad',
                dataIndex: 'relationshipUniversity'
            }

        ]
        return (
            <Row>
                <Col span={24}>
                    <h6>Lista de asistencia a los eventos</h6>
                </Col>
                <Col span={24}>
                  <Select className="Select_Assistance" defaultValue="Seleccionar un evento" onChange={this.getAssistenceByEvent} >
                      {this.state.events.map(e=>{
                          return <Option value={e.idEvents}> {e.eventName} </Option>
                      })}
                  </Select>  
                </Col>
                <Col>
                      {this.state.attendance.length > 0 ? 
                         <Table columns={columns} dataSource={this.state.attendance}>

                         </Table> : null
                      }
                </Col>
            </Row>
        )
    }
}

export default Assistance;