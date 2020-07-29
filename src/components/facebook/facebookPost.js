import React from 'react';
import {Form, Upload, Input, Row, Col, Button, Modal} from 'antd';
import {FacebookOutlined, ShareAltOutlined} from '@ant-design/icons';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Http from './../../api/http';
import './facebook.css';
import Social from './../../assets/social.svg';
const http = new Http();
const {TextArea} = Input;
const {success, error} = Modal;
const apiFacebook = 'https://graph.facebook.com';

class FacebookPost extends React.Component {

  

    constructor(props){
        super(props);
        this.state = {
            accessToken: '',
            idPage: '',
            namePage:'',
            editorState: EditorState.createEmpty()
        };
       
        this.onChange = editorState => this.setState({editorState});
    }

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
            message: this.state.editorState.getCurrentContent().getPlainText('\u0001'),
            url:`https://source.unsplash.com/featured/?quote`
        };

        const response = await http.postExternal(`${apiFacebook}/${this.state.idPage}/photos`, data);
        console.log(response);
        const post = response.post_id.split('_')[0];
        if(post === this.state.idPage) {
            success({content: 'Se realizo la publicacion en la pagina correctamente'});
        }else {
            error({ content: 'Hubo un error al realizar la publicacion en la pagina'});
        }
    }

    onChange = (e) =>{
        this.setState({message: e.target.value});
        console.log(this.state.message);
    }

    handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

        if(newState) {
            this.onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    onUnderlineClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
		);
    };
    
    onBoldClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
    };

    onItalicClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
		);
	};
    

    render() {
        return(
            <Row> 
                <Col span={24}>
                <div className="Div_Post_Header">
                    <img className="Div_Post_Header_Image" src={Social} />
                    {/* <FacebookOutlined style={{fontSize: '24px'}}/> */}
                    <h6>Pagina de facebook : {this.state.namePage} </h6>
                    
                </div>
                    
                    {/* <Form>
                        <Form.Item>
                            <TextArea placeholder="Publicacion" name="message" value={this.state.message} onChange={this.onChange} />
                        </Form.Item>
                     
                        <Form.Item>
                            
                        </Form.Item>
                    </Form>   */}
                                     
                </Col>
                <Col span={24}>
                <div className="editorContainer">
                        <Button onClick={this.onUnderlineClick}>U</Button>
				        <Button onClick={this.onBoldClick}>
					        <b>B</b>
                        </Button>
                        <Button onClick={this.onItalicClick}>
					        <em>I</em>
                        </Button>
                    </div>
                    <div className="editors">
                        <Editor editorState={this.state.editorState} 
                            onChange={this.onChange}
                            handleKeyCommand={this.handleKeyCommand} />

                    </div>
                   
                </Col>
                <Col span={24}>
                <Button className="Form_Item_Button"icon={<ShareAltOutlined/>} type="primary" 
                         onClick={this.sendPost}>Publicar</Button>
                   
                </Col>
            </Row>
        );
    }
}

export default FacebookPost;