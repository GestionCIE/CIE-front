import React, { Component } from "react";
import { Button, Tag, Input, Tooltip, Layout, Row, Col, Form, message, Table, Modal, TreeSelect} from 'antd';
import { PlusOutlined, SaveOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';
import Http from '../../api/http';
import SocketClient from  '../../socket/socketClient';
import './project.css';
const {Content} = Layout;
const {confirm, success} = Modal;
const { TreeNode } = TreeSelect;
const http = new Http();
const socket = new SocketClient();
socket.createSocket();

class Project extends Component{

    constructor(){
        super();
        this.handleDelete =  this.handleDelete.bind(this);
    }

    state = {
        nameProyect: '',
        tagsmethodologies: [],
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
        nameAsesor: localStorage.getItem("username"),
        data: [],
        edit: false,
        idEdit: '',
        value: undefined,
        Entre: [],
    };


    handleDelete = recoder =>{
        this.showConfirmDeleteProyect(recoder);
    }

    async getEntrepreneurs(){
        let entrepreneurs = [];
        const response = await http.get('project/getEntrepreneurs');
        for(let i=0; i < response.result.length; i++){
            entrepreneurs.push(response.result[i]);
        }

        console.log(entrepreneurs);
        this.setState({Entre: entrepreneurs});

    }

    showConfirmDeleteProyect(recoder){
        confirm({
            title: 'Deseas eliminar el proyecto ?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Este proyecto sera cancelado y quitado de la vista de los usuarios',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'No',
            onOk: ()=>{ this.deleteProyect(recoder.idProject)}
        });
    }

    async deleteProyect(id) {
        const jsonid = {id: id};
        const response = await http.post('project/deleteProject', jsonid);
            if(response.result === 'erased'){
                success({content:'se ha eliminado el evento'});
                this.reloadTable();
            }
    }

    handleEdit = recoder =>{
        console.log('edit', recoder);
        this.setState({
            nameProyect : recoder.projectName,
            tagsmethodologies: recoder.methodologicalPhases.split(','),
            Entre: this.state.Entre,
            idEdit: recoder.idProject,
            edit: true
        });
        console.log(this.state.nameProyect);
            
    }

    updateProyect = async ()=>{
        const jsonProyect = {
            nameProyect: this.state.nameProyect,
            nameAsesor: this.state.nameAsesor,
            tagsmethodologies: this.state.tagsmethodologies,
            Entre: this.state.value,
            id: this.state.idEdit
        };
                
        console.log("nombreeee", this.state.nameProyect);

        const response = await http.post('project/editProject', jsonProyect);
        if(response.result === 'edited'){
            success({content: 'el proyecto ha sido editado'});
            this.setState({
                nameProyect : "",
                idEdit: "",
                edit: false
            });
            this.reloadTable();
        }
    }
    
   
    createProyect = async ()=> {
        const jsonProyect = {
            nameProyect: this.state.nameProyect,
            tagsmethodologies: this.state.tagsmethodologies,
            nameAsesor: this.state.nameAsesor,
            value: this.state.value      
        };
        console.log("json",jsonProyect);
        const response = await http.post('project/createProject', jsonProyect);

        if(response.result === 'created') {
            success({content: 'se ha creado un proyecto y se han agregado los emprendores con exito'});
            const notification = {
                to: this.state.value,
                message: `El asesor ${localStorage.getItem('username')} te ha invitado a trabajar`,
                from: localStorage.getItem('username'),
                image: localStorage.getItem('imageUrl')
            };
            socket.emit('/invite', notification);
            socket.on('/invited', (data) => {
               console.log(data);
            });

            this.reloadTable();

        }
    }

    async reloadTable(){
        let data = [];
        const jsonasesor = {
            nameAsesor: this.state.nameAsesor
        }

        console.log(jsonasesor);

        const response = await http.post('project/getProjects2', jsonasesor);
        for(let i=0; i < response.result.length; i++){
            data.push(response.result[i]);
        }

        this.setState({data: data});

    }

    componentDidMount(){
        this.reloadTable();
        this.getEntrepreneurs();
    }



    onChangeData = (e)=>{
        this.setState({[e.target.name] : e.target.value})
    }

    onChange = value => {
        console.log("onchange select entre", value);
        this.setState({ value });
    };

 
    handleClose = removedTag => {
        const tagsmethodologies = this.state.tagsmethodologies.filter(tag => tag !== removedTag);
        console.log(tagsmethodologies);
        this.setState({ tagsmethodologies });
    };
    
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };
    
    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };
    
    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tagsmethodologies } = this.state;
        if (inputValue && tagsmethodologies.indexOf(inputValue) === -1) {
            tagsmethodologies = [...tagsmethodologies, inputValue];
        }
        console.log(tagsmethodologies);
        this.setState({
          tagsmethodologies,
          inputVisible: false,
          inputValue: '',
        });

        console.log(this.state.data);
        
    };


    handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value });
    };
    
    handleEditInputConfirm = () => {
        this.setState(({ tagsAdvisers, editInputIndex, editInputValue }) => {
          const newTagsAdvisers = [...tagsAdvisers];
          newTagsAdvisers[editInputIndex] = editInputValue;
          
    
          return {
            tagsAdvisers: newTagsAdvisers,
            editInputIndex: -1,
            editInputValue: '',
          };
        });
    };

    
    saveInputRef = input => (this.input = input);
    
    saveEditInputRef = input => (this.editInput = input);


    howIsButton(){
        let button = null;

        if(this.state.edit){
            button = (<Button  className="Btn_Project_Edit" onClick={ this.updateProyect }> <EditOutlined /> Editar Proyecto</Button> );
            
        } else{
            button = (<Button  className="Btn_Project" type="primary" onClick={ this.createProyect.bind(this) }> <SaveOutlined /> Crear Proyecto</Button>);
        }
        return button;
    }

    cancelEdit = () => {
        this.setState({
            edit:false
        });
    }

    cancelButton(){
        return (<Button  className="Btn_Project_Edit" onClick={ this.cancelEdit }> <CloseOutlined /> Cancelar Edición</Button> );
    }
    

    render() {

        const columns = [
            {
                title: 'Nombre del proyecto',
                dataIndex: 'projectName'
            },
            {
                title: 'Asesor actual',
                dataIndex: 'currentAdvisor'
            },
            {
                title: 'Fases de la metodologia',
                dataIndex: 'methodologicalPhases'
            },
            {
                title: 'Emprendedores',
                dataIndex: 'entrepreneurs'
            },
            {
                title: 'Editar',
                dataIndex: 'edit',
                render: (text, recoder)=>( <Button  onClick={() => this.handleEdit(recoder)}> <EditOutlined /> Editar</Button>)
            }, 
            {
                title: 'Eliminar',
                dataIndex: 'delete',
                render: (text, recoder)=>( <Button type="danger" onClick={() => this.handleDelete(recoder)}> <DeleteOutlined>/</DeleteOutlined> Eliminar</Button>)
            }, 
        ];

       
        const { tagsmethodologies, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
        return (
            <Content>
                <Row>
                    <Col span={7}>
                        <Form>
                            <Form.Item >
                                <p>Lider del proyecto</p>
                                <label>{localStorage.getItem("username")}</label>
                            </Form.Item>

                            <Form.Item>
                                <p>Nombre del proyecto</p>
                                <Input id="input" placeholder="Nombre" value={this.state.nameProyect} name="nameProyect" onChange = {this.onChangeData.bind(this)}/> 
                            </Form.Item>

                            <Form.Item>
                                <p>Fases de la metodologia</p>
                                {tagsmethodologies.map((tag, index) => {
                                 if (editInputIndex === index) {
                                    return (
                                        <Input ref={this.saveEditInputRef} key={tag} size="small" className="tag-input"
                                        value={editInputValue} onChange={this.handleEditInputChange} onBlur={this.handleEditInputConfirm}
                                        onPressEnter={this.handleEditInputConfirm} /> 
                                        );
                                    }

                                    const isLongTag = tag.length > 20;

                                    const tagElem = (
                                        <Tag className="edit-tag" key={tag} closable={index !== 0} onClose={() => this.handleClose(tag)}>
                                            <span onDoubleClick={e => {
                                                if (index !== 0) {
                                                    this.setState({
                                                        editInputIndex: index,
                                                        editInputValue: tag },
                                                        () => { this.editInput.focus()
                                                    });
                                                e.preventDefault();
                                                }
                                            }}>
                                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                            </span>
                                        </Tag>
                                    );
                                    return isLongTag ? (
                                    <Tooltip title={tag} key={tag}> 
                                        {tagElem}
                                    </Tooltip>
                                    ) : (tagElem);
                                    })
                                    }
                                    {inputVisible && (
                                    <Input
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        className="tag-input"
                                        value={inputValue}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputConfirm}
                                        onPressEnter={this.handleInputConfirm}
                                    />
                                    )}
                                    {!inputVisible && (
                                        <Tag className="site-tag-plus" onClick={this.showInput}>
                                            <PlusOutlined /> Fases de la metodologia
                                        </Tag>
                                    )}
                            </Form.Item>
                            
                            <Form.Item>
                              <p>Emprendedores</p>
                              <TreeSelect
                                showSearch
                                style={{ width: '100%' }}
                                value={this.state.value}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select"
                                allowClear
                                multiple
                                treeDefaultExpandAll
                                onChange={this.onChange}
                                >
                                    {
                                         this.state.Entre.map(Entrepreneurs =>{
                                             return(
                                            <TreeNode value={Entrepreneurs.name} title={Entrepreneurs.name} />
                                             );
                                        })
                                    }
                                </TreeSelect>
                            </Form.Item>
                        
                            <Form.Item>
                                {this.howIsButton()}
                                {this.state.edit ? this.cancelButton() : null}
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={16} push={1}>
                        <h6>Proyectos de emprendimiento</h6>
                        <Table rowKey={recoder => recoder.idEvents } size="small" columns={columns} dataSource={this.state.data} ></Table>
                    </Col>
                </Row>
            </Content>
        )
    }
}

export default Project;