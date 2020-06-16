import React from 'react';
import {Row, Col, Upload, Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import {LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './profile.css';

const {warning} = Modal;
class ProfileComponent extends React.Component{
    
    state = {
        loading: false
    }

    uploadButton = ()=> (
    <div>
        {this.state.loading} ? <LoadingOutlined /> : <PlusOutlined/>
        <div className="ant-upload-text">Upload</div>
    </div>)

    beforeUpload(file) {
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
        if(!isImg) 
            warning("Error al subir la foto"); 
        return isImg;
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
                this.setState({
                    imageUrl,
                    loading: false
                })
            });
        }
    }  

    render() {
        return(
            <Row>
                <Col span={10}>
                   <h6>Perfil de usuario</h6>
                   <Upload
                   name="avatar"
                   listType="picture-card"
                   className="avatar-uploader"
                   showUploadList={false}
                   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                   beforeUpload={this.beforeUpload}
                   onChange={this.onChange}
                   >
                    {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" 
                    style={{ width: '100%', maxHeight: '13vh' }} /> : this.uploadButton }
                   </Upload>
                   <h6>Datos de contacto</h6><br />
                   <div className="Profile_Data_Contact">
                        <p> <b>Correo Electronico: </b></p>
                        <p>cvg97@misena.edu.co</p>

                        <p><b>Telefono:</b> <span>3827745</span></p>
                        <p><b>Celular:</b> <span>3017591492</span> </p>
                       
                   </div>
                   <div className="Profile_Buttons">
                        <Button type="primary">Cambiar Contraseña</Button>
                        <Button type="primary">Editar Perfil</Button>
                   </div>
                </Col>
                <Col span={12}>
                    <div className="Profile_Content_Col2">
                        <h6>Datos Basicos</h6>
                        <div>
                            <p><b>Nombre: </b> <span>Cristian Vargas</span></p>
                            <p><b>Tipo de usuario: </b> <span>Emprendedor</span></p>
                            <p><b>Relacion con la CUA: </b> <span>Estudiante</span></p>
                            <p><b>Semestre Academico: </b> <span>9</span></p>
                        </div>
                        
                        <div>
                        <h6>Proyecto</h6>
                            <p><b>Proyecto Actual: </b> <span>AppWit</span></p>
                            <p><b>Rol: </b> <span>Participante</span></p>
                        </div>    
                    </div>

                </Col>
            </Row>
        )
    }
}

export default ProfileComponent;