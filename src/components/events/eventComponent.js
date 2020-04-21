import React from 'react';
import { Input, Button, Layout, Row, Col, DatePicker, Upload, Table } from 'antd';
import {UploadOutlined} from '@ant-design/icons';

const {Content} = Layout;
const {TextArea} = Input;
const columns = [
    {
        title: 'Evento',
        dataIndex: 'event'
    },
    {
        title: 'Fecha del evento',
        dataIndex: 'date'
    },
    {
        title: 'Descripción',
        dataIndex: 'descriptión'
    },
    {
        title: 'Editar',
        dataIndex: 'edit',
        render: ()=> <Button>Editar</Button>
    }, 
    {
        title: 'Eliminar',
        dataIndex: 'delete',
        render: ()=> <Button type="primary" danger>Eliminar</Button>
    }, 
    {
        title: 'Publicar',
        dataIndex: 'publish',
        render: ()=> <Button type="primary" >Publicar</Button>
    }
];

const data = [];

for(let i=0; i < 1; i++){
    data.push({key: i, 
        event: `Cristian Vargas ${i}`,
        date: i,
        descriptión: `Bquilla ${i}`,
        });
}

class EventComponent extends React.Component {
    render(){
        return(
            <Content>
                <Row>
                    <Col span={8}>
                        <Row>
                            <Col span={15}>
                                <Input placeholder="Nombre del evento"/> 
                            </Col>
                            <br/>
                            <br/>
                        </Row>
                        <Row>
                            <Col span={15}>
                                <DatePicker placeholder="Fecha del evento"/>              
                            </Col>
                            <br/>
                            <br/>
                        </Row>
                        <Row>
                            <Col span={15}>
                                <TextArea placeholder="Descripción" allowClear/>
                                <br/>
                                <br/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={15}>
                                <Upload>
                                    <Button>
                                    <UploadOutlined/> Subir Archivo
                                    </Button>
                                </Upload>
                                <br/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={15}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Crear Evento
                                </Button> 
                            </Col>
                        </Row>
                    </Col>
                    <Col span={16}>
                        <Table columns={columns} dataSource={data}></Table>
                    </Col>
                </Row>
            </Content>
        );
    }
}


export default EventComponent;
