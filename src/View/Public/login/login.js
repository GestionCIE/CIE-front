import React from 'react';
import {Input, Form, Button, Layout, Row, Col, Avatar} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import FacebookLogin from "../../../components/FacebookLogin/FacebookLogin"
const {Content} = Layout;

class Login extends React.Component{

    state = {
        username: '' , 
        password: ''
    };

    onChangeData = (e)=> {
        this.setState({[e.target.name]: e.target.value});
        console.log(e.target.name);
    }



    login = (e) =>{
        const data = { ...this.state};
        console.log("data", this.props);

            fetch('http://localhost:3005/users/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
            }}).then(res =>res.json())
            .then((response) =>{
                console.log("respuesta ", response);
                if(response.login){
                    localStorage.setItem("TOKEN", response.token);
                    const username = response.result[0].name;
                    const role = response.result[0].role;
                    const id = response.result[0].idUsers;
                    localStorage.setItem("username", username);
                    localStorage.setItem("role", role);
                    localStorage.setItem("idUser", id);
                    this.props.history.push('/admin');
                }
            });
    }
    render(){
        return(
        <Content>
            <Row className="parent">
                <Col span={6}>
                    <Avatar className="child" size={64} icon={<UserOutlined/>} />
                    <Form>
                        <Form.Item 
                           
                            rules={[{required: true, message: 'Ingresar su usuario o correo'},]}
                        >
                            <Input  prefix={<UserOutlined/>} name="username" placeholder="Usuario o Correo"
                            onChange = {this.onChangeData} value = {this.state.username} />
                        </Form.Item>

                        <Form.Item
                        
                         hasFeedback rules={[{required: true, message: 'Ingresa tu contraseña'}]}
                        >
                            <Input.Password  prefix={<LockOutlined/>} name="password"  placeholder="Contraseña"
                             onChange = {this.onChangeData} value={this.state.password} />
                        </Form.Item> 

                        <Form.Item
                        >
                            <Button type="primary" className="login-form-button"  onClick={this.login}> Ingresar </Button>
                        </Form.Item>

                        <Form.Item>
                            <FacebookLogin history={this.props.history}/>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Content>
        );
        
    }
}


export default Login;