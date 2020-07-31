import React from 'react';
import {Row, Col, Upload, Button, Form, Input, Steps, Select, Tag, Modal} from 'antd';
import 'antd/dist/antd.css';
import {LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './profile.css';

import  ProfileApi, {POST_UPLOAD_FILE_PROFILE} from '../../api/profile/profile';
import Http from './../../api/http';

const http = new Http();
const api = new ProfileApi();
const {Step}  = Steps;
const {warning} = Modal;
const {Option} = Select;



class ProfileComponent extends React.Component{
    
    state = {
        loading: false,
        modalEditProfile: false,
        modalChangePassword: false,
        current: 0,
        name: '',
        username: '',
        role: '',
        relationshipUniversity: '',
        phone: '',
        mobile: '',
        email: '',
        imageUrl: '',
        project: '',
        rol: ''
    }

    async getProfile(){
        const response = await http.get(`users/getUserById?id=${localStorage.getItem('idUser')}`);
        const user = response.result[0];
        console.log(response);
        const project = response.project;
        this.setState({
            name: user.name,
            username :user.username,
            role: user.role,
            relationshipUniversity: user.relationshipUniversity,
            phone: user.phone,
            mobile: user.mobile,
            email: user.email,
            imageUrl: user.image,
            project: project.projectName,
            rol: project.rol
        });
    }

    componentDidMount(){
        this.getProfile();
    }

    next(){
        const current = (this.state.current + 1);
        this.setState({current}); 
    }

    prev(){
        const current = (this.state.current - 1);
        this.setState({current});
    }

    showModalEditProfile = () =>{
        this.setState({
            modalEditProfile: true
        });
    }
    closeModalEditProfile = () =>{
        this.setState({
            modalEditProfile: false
        });
    }

    onChangeForm = (e) =>{
        console.log(e.target.name);
        this.setState({[e.target.name] : e.target.value})
    }

    uploadButton = ()=> (
    <div>
        {this.state.loading} ? <LoadingOutlined /> : <PlusOutlined/>
        <div className="ant-upload-text">Upload</div>
    </div>)

    beforeUpload = async (file) =>{
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
        if(!isImg) 
            warning("Error al subir la foto"); 
        const response =  await  http.post('users/writeIdProfile',{id: localStorage.getItem('idUser')});//api.writeIdProfile();
        console.log("before", response);
        return isImg;
    }

    changeProfileFather(img){
       this.props.handle(img);
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    onChange = (info)=> {
        console.log(info.file);
        if(info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }

        if(info.file.status == 'done') {
            this.getBase64(info.file.originFileObj, imageUrl =>{
                this.changeProfileFather(imageUrl);
                this.setState({
                    imageUrl,
                    loading: false
                })
            });
        }
    }
    
    basicData = () =>{
        return (<Form>
            <Form.Item>
                <label>Ingresar nombre</label>
                <Input name="name" value={this.state.name} onChange={this.onChangeForm} />
            </Form.Item>
            <Form.Item>
                <label>Ingresar nombre de usuario</label>
                <Input name="username" value={this.state.username} onChange={this.onChangeForm} />
            </Form.Item>
            <Form.Item>
                <Row>
                    <Col span={12}>
                        <label>Tipo de Usuario</label> <br/>
                        <Tag color="#108ee9">{this.state.role}</Tag>
                    </Col>
                    <Col span={12}>
                        <label>Relacion con la CUA  </label><br/>
                        <Tag color="#108ee9" >{this.state.relationshipUniversity}</Tag>
                    </Col>
                </Row>
                
              
            </Form.Item>
        </Form>
        )
    }

    contactInformation = () =>{
        return (<Form>
            <Form.Item>
                <label>Correo Eletronnico</label>
                    <Input name="email" value={this.state.email} onChange={this.onChangeForm}/>
                </Form.Item>
                <Form.Item>
                    <label>Telefono</label>
                    <Input name="phone" value={this.state.phone} onChange={this.onChangeForm} />
                </Form.Item>
                <Form.Item>
                    <label>Celular </label>
                    <Input name="mobile" value={this.state.mobile} onChange={this.onChangeForm}/>
                </Form.Item>
            </Form>
        ) 
    }
 

    proyect = () =>{
        return (<Form>
            <Form.Item>
                <Row>
                    <Col span={12}>
                        <label>Proyecto Actual</label> <br/>
                        <Tag color="#108ee9"> {this.state.project} </Tag>
                    </Col>
                    <Col span={12}>
                        <label>Rol</label><br/>
                        <Tag  className="Tag_Rol" color="#108ee9"> {this.state.rol}</Tag>
                    </Col>
                </Row>    
                </Form.Item>
            </Form>
        )
    }

    handleEdit = async () =>{
        const data = {...this.state, id: localStorage.getItem('idUser')};
        const response = await  http.post('users/editUser', data);
        console.log(response);
        if(response.result == 'edited'){
            Modal.success({content: "El perfil se ha actualizado"});
            this.closeModalEditProfile();
        }else {
            Modal.success({content:"El perfil no pudo ser actualizado"});
            this.closeModalEditProfile();
        }
    }

    render() {

        const titles_steps = [
            {title:'Datos Basicos',
            content: this.basicData},
            {title: 'Contactos',
            content: this.contactInformation},
            {title: 'Proyecto Asociado',
            content: this.proyect}
        ];

        return(
            <Row>
                <Col span={10}>
                   <h6>Perfil de usuario</h6>
                   <Upload
                   name="profile"
                   listType="picture-card"
                   className="avatar-uploader"
                   showUploadList={false}
                   action={http.uploadImage('users/uploadProfile')}
                   beforeUpload={this.beforeUpload}
                   onChange={this.onChange}
                   >
                       
                    {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" 
                    style={{ width: '100%', maxHeight: '10vh' }} /> : this.uploadButton }
                   </Upload>
                   
                   <div className="Profile_Data_Contact">
                        <h6>Datos de contacto</h6><br />
                        <p> <b>Correo Electronico: </b></p>
                        <p>{this.state.email}</p>
                        <p>{this.state.phone}</p>
                        <p><b>Telefono:</b> <span>{ (this.state.phone !== undefined )? this.state.phone : 'No tiene telefono' }  </span></p>
                        <p><b>Celular:</b> <span>{ (this.state.mobile !==undefined) ?  this.state.mobile : 'No tiene celular' }</span> </p>
                       
                   </div>
                   <div className="Profile_Buttons">
                        <Button  type="primary">Cambiar Contraseña</Button>
                        <Button onClick={this.showModalEditProfile}type="primary">Editar Perfil</Button>
                   </div>
                </Col>
                <Col span={12}>
                    <div className="Profile_Content_Col2">
                      
                        <div>
                            <h6>Datos Basicos</h6>
                            <p><b>Nombre: </b> <span>{this.state.name} </span></p>
                            <p><b>Tipo de usuario: </b> <span>{this.state.role}</span></p>
                            <p><b>Relacion con la CUA: </b> <span>{this.state.relationshipUniversity}</span></p>
                            {/* <p><b>Semestre Academico: </b> <span>9</span></p> */}
                        </div>
                        
                        <div>
                        <h6>Proyecto</h6>
                            <p><b>Proyecto Actual: </b> <span>{this.state.project}</span></p>
                            <p><b>Rol: </b> <span>{this.state.rol}</span></p>
                        </div>    
                    </div>

                </Col>
                <Modal
                    title="Edición del Perfil de usuario"
                    visible={this.state.modalEditProfile}
                    onCancel={this.closeModalEditProfile}
                    onOk={this.closeModalEditProfile}
                >
                    <Row>
                        <Col span={24}>
                            <Steps current={this.state.current}>
                                { titles_steps.map(item => 
                                <Step key={item.title} title={item.title} />
                                )}
                            </Steps>
                            <div className="steps-content">
                                {titles_steps[this.state.current].content()}
                            </div>
                            <div className="steps-action">
                                    { this.state.current < titles_steps.length -1  && (
                                    <Button type="primary" onClick={()=> this.next()}>
                                        Siguiente
                                    </Button>)}

                                    { this.state.current === titles_steps.length -1 && (
                                        <Button type="primary" onClick={()=> this.handleEdit()}>
                                            Editar
                                        </Button>)
                                    }

                                    { this.state.current > 0 && (
                                        <Button type="primary" style={{ margin: '0 8px' }} onClick={()=> this.prev()}>
                                            Anterior
                                        </Button>)}
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </Row>
        )
    }
}

export default ProfileComponent;