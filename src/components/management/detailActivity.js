import React from 'react';
import {Drawer, Row, Col, Avatar, Tooltip, Button } from  'antd';
import Comments from './comments';
class detailActivity extends React.Component {
    state = {
        visibleDrawer: false,
        activity:[],
        commentary: ''
        
    };

    componentDidUpdate(){
        console.log(this.props.detailtActivity);
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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
                            Proin.</p>
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
                             <span>Recursos: </span>
                             <a href="/falsy"> Investigacion 1</a>
                             <a href="/falsy"> Investigacion 1</a>
                             <a href="/falsy"> Investigacion 1</a>
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