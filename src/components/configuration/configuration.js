import React from 'react';
import {Row, Col, Tabs} from 'antd';

import './configuration.css';
import AdvancedSettings from './advancedSettings';
import RoleSettings from './roleSettings';

const {TabPane} = Tabs;

class Configuration  extends React.Component{



    render(){

        return(

        <Row>
            <Col span={24}>
                <Tabs >
                    <TabPane tab="Configuracion de usuarios" key="1"> 
                        <RoleSettings />
                    </TabPane>
                    <TabPane tab="Configuracion avanzada del sistema" key="2">
                        <AdvancedSettings />
                    </TabPane>
                    <TabPane tab="Backup del sistema" key="3">

                    </TabPane>
                </Tabs>
            </Col>
        </Row>

        );
    }

}


export default Configuration;

