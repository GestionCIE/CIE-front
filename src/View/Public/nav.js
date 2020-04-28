import React from 'react';
import {Menu, Row, Col, Button} from 'antd';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './public.css';


class Nav extends React.Component{
    
    
    render(){
        return(
            
        <Row>
            <Col >
                <Menu theme="dark" mode="horizontal" > 
                    <Menu.Item key="1"> <Link to="/cie">CIE</Link></Menu.Item>
                    <Menu.Item key="2"> Acerca de</Menu.Item>
                    <Menu.Item key="3">Perfiles</Menu.Item>
                </Menu>
            </Col>
            <Col push={14}>

                <a type="primary" >
                    <Link to="/signup">Iniciar Seccion</Link>
                </a>
                <a type="primary" style={{marginLeft: '20px'}}>
                    <Link to="/signin">Registrarse</Link>
                </a>
            </Col>
        </Row>
        );
    }
}

export default Nav;
