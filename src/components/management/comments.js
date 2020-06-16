import React from 'react';
import {Comment, Avatar, Form, Button, List, Input} from 'antd';
import moment from 'moment';

const {TextArea} = Input;

const CommentList = ({comments}) => (
    <List dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ?'Comentarios' : 'Comentario'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}  />
)

const MicroEditor = ({onChange, onSubmit, submitting, value}) => (
    <>
        <Form.Item>
            <TextArea row={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Añadir Comentario
            </Button> 
        </Form.Item>
    </>
)

class Comments extends React.Component {
    state = {
        comments: [],
        submitting: false,
        value: ''
    };

    handleSubmit = () => {
        if(!this.state.value){
                return;
        }

        this.setState({
            submitting: true
        });

        setTimeout(()=>{
            this.setState({
                submitting: false,
                value: '',
                comments : [
                    {
                        author: 'Cristian Vargas',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p> {this.state.value} </p>,
                        datetime: moment().fromNow()
                    },
                    ...this.state.comments
                ]
            })

        }, 1000);
    }

    handleChange = e => {
        this.setState({
            value: e.target.value
        });
    }


    render(){
        return(
        <>
            {this.state.comments.length > 0 && <CommentList comments={this.state.comments} />}
            <Comment
                avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Cristian vargas"
                    />
                }
                content={
                    <MicroEditor
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    submitting={this.state.submitting}
                    value={this.state.value} />
                }
            />
        </>)
    }

}

export default Comments;