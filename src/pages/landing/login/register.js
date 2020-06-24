import React from 'react';
import {Input, Form, Layout, Row, Col, Button, Select, message} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import history from '../../../routers/history';
import './login.css';

const {Content} = Layout;
const {Option} = Select;

class Register extends React.Component{

    state = {
        username: '',
        fullname:'',
        password: '',
        email: '',
        relationship: 'Relación con la Universidad' //default value
    };

    register = (e)=>{

        const data = { ...this.state};
        console.log("data", data);

        fetch('http://localhost:3005/users/createUser', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
        }}).then(res =>res.json())
        .then((response) =>{
            console.log(response);
            if(response.result == 'created'){
                message.success("Se ha registrado correctamente");
                this.props.history.push('/signup')
            }
        });
    }

    onChangeSelect = (value)=>{
        this.setState({relationship: value});
    }

    onChangeData = (e)=> {
        this.setState({[e.target.name]: e.target.value});
        console.log(e.target.name);
    }
    render(){

        return(

        <Content>
            <Row className="parent">
                <Col span={8} >
                    <Form >
                    <Form.Item
                     rules={[{required: true, message: 'Ingresar su nombre'},]}>
                        <Input prefix={<UserOutlined/>} name="fullname"  value={this.state.fullname} placeholder={"Nombre completo"} onChange={this.onChangeData}/>
                    </Form.Item>
                    <Form.Item
                     rules={[{required: true, message: 'Ingresa el nombre del usuario'},]}>
                        <Input prefix={<UserOutlined/>} name="username" value={this.state.username} placeholder={"Nombre de usuario"} onChange={this.onChangeData}/>
                    </Form.Item>
                    <Form.Item name="password"
                     hasFeedback rules={[{required: true, message: 'Ingresa tu contraseña'}]}>
                        <Input.Password prefix={<LockOutlined/>}  value={this.state.password} name="password" placeholder={"Contraseña"} onChange={this.onChangeData} />
                    </Form.Item>
                    <Form.Item name="r-password"
                    hasFeedback rules={[{required: true, message: 'Ingresa tu contraseña'},
                    ({getFieldValue})=>({
                       validator(rule, value){
                           if(!value || getFieldValue('password') == value)
                                return Promise.resolve();
                            return Promise.reject('La contraseña no coincide');
                       }
                     })]}
                    dependencies={['password']}>
                        <Input.Password prefix={<LockOutlined/>} name="r-password" placeholder={"Repite tu Contraseña"}/>
                    </Form.Item>
                    <Form.Item
                     rules={[{required: true, message: 'Ingresa su email'},
                        {type: 'email', message: 'Ingrese un email valido'}]}>
                        <Input prefix={<MailOutlined />}  name="email" value={this.state.email} placeholder={"Email"} onChange={this.onChangeData}/>
                    </Form.Item>
                    <Form.Item >
                        <Select defaultValue={this.state.relationship}  onChange={this.onChangeSelect}>
                            <Option value="graduate">Egresado de la U</Option>
                            <Option value="student">Estudiante</Option>
                            <Option value="other">Otro</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.register} type={"primary"} className="login-form-button">Registrarme</Button>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Content>
        );

    }
}


export default Register;
