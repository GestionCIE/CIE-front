import React from 'react';
import {Form, Upload, Input, Row, Col, Button} from 'antd';
import {FacebookOutlined, ShareAltOutlined} from '@ant-design/icons';

import Http from './../../api/http';
import './facebook.css';
const http = new Http();
const {TextArea} = Input;
const apiFacebook = 'https://graph.facebook.com'

class FacebookPost extends React.Component {

    state = {
        accessToken: '',
        idPage: '',
        namePage:'',
        message: ''
    };

    componentDidMount() {
        this.getConfigFacebook().then( async () => {
            const response = await 
            http.getExternal(`${apiFacebook}/${this.state.idPage}/?access_token=${this.state.accessToken}`)
            console.log(response);
            this.setState({namePage: response.name});
        });
    }

    async getConfigFacebook(){
        const response = await http.get('config/facebook');
        if(response.result.length > 0) {
            this.setState({
                accessToken: response.result[0].accessToken,
                idPage: response.result[0].idPage
            });
        }
    }

     sendPost = async () => {
        console.log(this.state.accessToken);
        console.log(this.state.message);
        const data = {
            access_token: this.state.accessToken,
            message: this.state.message,
            url:`https://source.unsplash.com/featured/?quote`
        };

        const response = await http.postExternal(`${apiFacebook}/${this.state.idPage}/photos`, data);
        console.log(response);

    }

    onChange = (e) =>{
        this.setState({message: e.target.value});
        console.log(this.state.message);
    }

    render() {
        return(
            <Row> 
                <Col span={24}>
                    
                    <div className="Div_Content_Post">
                    
                    <div className="Div_Content_Post_Header">
                        <FacebookOutlined style={{fontSize: '24px'}}/>
                        <h6>Pagina de facebook : {this.state.namePage} </h6>
                    </div>
                    <Form>
                        <Form.Item>
                            <TextArea placeholder="Publicacion" name="message" value={this.state.message} onChange={this.onChange} />
                        </Form.Item>
                        <Form.Item>
                            <Button className="Form_Item_Button"icon={<ShareAltOutlined/>} type="primary" onClick={this.sendPost}>Publicar</Button>
                        </Form.Item>
                    </Form>  
                    </div>                    
                </Col>
            </Row>
        );
    }
}

export default FacebookPost;