import React from 'react';
import { Input, Button } from 'antd';
import {Layout, Row, Col} from 'antd';
const {Content} = Layout;

class EventComponent extends React.Component {
    render(){
        return(
            <Content>
                <Row>
                    <Col span={6}>
                        <Input placeholder="Nombre del evento"/> <br/>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Input placeholder="Nombre del evento"/> <br/>                  
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Crear Evento
                        </Button> 
                    </Col>
                </Row>
            </Content>
        );
    }
}


export default EventComponent;
