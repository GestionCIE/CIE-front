import React, { Component } from "react";
import { Button, Tag, Input, Tooltip, Layout, Row, Col, Form, message, Table, Modal} from 'antd';
import { PlusOutlined, SaveOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

    const {Content} = Layout;
    const {confirm} = Modal;

class ProyectComponent extends Component{

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
        //-------------------
        tagsEntrepreneurs: [],
        inputVisible2: false,
        inputValue2: '',
        editInputIndex2: -1,
        editInputValue2: '',
        };


        handleDelete = recoder =>{
            this.showConfirmDeleteProyect(recoder);
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

        deleteProyect(id) {
            const jsonid = {id: id};
            fetch('http://localhost:3005/project/deleteProject', {
                method: 'POST',
                body: JSON.stringify(jsonid),
                headers:{
                    'Content-Type': 'application/json'
                }})
                .then(res=> res.json())
                .then((response)=>{
                    if(response.result === 'erased'){
                        message.error('se ha eliminado el evento');
                    }
                    this.reloadTable();
                });   
        }

        handleEdit = recoder =>{
            console.log('edit', recoder.projectName);
            this.setState({
                nameProyect : recoder.projectName,
                idEdit: recoder.idProject,
                edit: true
            });
            console.log(this.state.nameProyect);
            
        }
        updateProyect = ()=>{
            const jsonProyect = {
                nameProyect: this.state.nameProyect,
                nameAsesor: this.state.nameAsesor[0].name,
                tagsmethodologies: this.state.tagsmethodologies,
                tagsEntrepreneurs: this.state.tagsEntrepreneurs,
                id: this.state.idEdit};
                
                console.log(this.state.nameProyect);
                
            fetch('http://localhost:3005/project/editProject', {
                method: 'POST',
                body: JSON.stringify(jsonProyect),
                headers:{
                    'Content-Type': 'application/json'
                }})
                .then(res=> res.json())
                .then((response)=>{
                    if(response.result === 'edited'){
                        message.success('el proyecto ha sido editado');
                        this.setState({
                            nameProyect : "",
                            idEdit: "",
                            edit: false
                        });
                    }
                    this.reloadTable();
                });
        }
    
        //------------------------------------------------------------
        

        createProyect = ()=>{

          const jsonProyect = {
              nameProyect: this.state.nameProyect,
              tagsmethodologies: this.state.tagsmethodologies,
              nameAsesor: this.state.nameAsesor,
              tagsEntrepreneurs: this.state.tagsEntrepreneurs      
          };
          console.log("json",jsonProyect);    
          fetch('http://localhost:3005/project/createProject', {
              method: 'POST',
              body: JSON.stringify(jsonProyect),
              headers:{
                  'Content-Type': 'application/json'
              }})
              .then(res=> res.json())
              .then((response)=>{
                  if(response.result === 'created'){
                      message.success('se ha creado un proyecto');
                  }
                  this.reloadTable();
              });
      }

      reloadTable(){
        let data = [];
        fetch('http://localhost:3005/project/getProjects')
            .then(res=> res.json())
            .then((response)=>{
                console.log(response);
                for(let i=0; i < response.result.length; i++){
                    data.push(response.result[i]);
                }
                this.setState({data: data});
                
            });
            console.log("datos table", this.state.data);
            
    }

    componentDidMount(){
        this.reloadTable();
     }


//-----------------------------------------------------------------
    onChangeData = (e)=>{
        this.setState({[e.target.name] : e.target.value})
    }

    //---------------------------------------------------------------------------
    handleClose = removedTag => {
        const tagsmethodologies = this.state.tagsmethodologies.filter(tag => tag !== removedTag);
        console.log(tagsmethodologies);
        this.setState({ tagsmethodologies });
      };

      //entrepreneurs
      handleClose2 = removedEntrepreneurs => {
        const tagsEntrepreneurs = this.state.tagsEntrepreneurs.filter(tag => tag !== removedEntrepreneurs);
        console.log(tagsEntrepreneurs);
        this.setState({ tagsEntrepreneurs });
      };
    
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      };

      //entrepreneurs
      showInput2 = () => {
        this.setState({ inputVisible2: true }, () => this.input.focus());
      };

    
      handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
      };

      handleInputChange2 = e => {
        this.setState({ inputValue2: e.target.value });
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

      handleInputConfirm2 = () => {
        const { inputValue2 } = this.state;
        let { tagsEntrepreneurs } = this.state;
        if (inputValue2 && tagsEntrepreneurs.indexOf(inputValue2) === -1) {
          tagsEntrepreneurs = [...tagsEntrepreneurs, inputValue2];
        }
        console.log(tagsEntrepreneurs);
        this.setState({
          tagsEntrepreneurs,
          inputVisible2: false,
          inputValue2: '',
        });

        console.log(this.state.data);
        
      };


      handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value });
      };

      handleEditInputChange2 = e => {
        this.setState({ editInputValue2: e.target.value });
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

      handleEditInputConfirm2 = () => {
        this.setState(({ tagsEntrepreneurs, editInputIndex2, editInputValue2 }) => {
          const newTagsEntre = [...tagsEntrepreneurs];
          newTagsEntre[editInputIndex2] = editInputValue2;

          return {
            tagsEntrepreneurs: newTagsEntre,
            editInputIndex2: -1,
            editInputValue2: '',
          };
        });
      };
    
      saveInputRef = input => (this.input = input);
    
      saveEditInputRef = input => (this.editInput = input);

      saveInputRef2 = input => (this.input = input);
    
      saveEditInputRef2 = input => (this.editInput = input);


      //---------------------------------------------------------
      howIsButton(){
        let button = null;
        
        if(this.state.edit){
            button = (<Button  stye={{marginleft: '2%'}}onClick={ this.updateProyect }> <EditOutlined /> Editar Proyecto</Button> );
        } else{
            button = (<Button type="primary" onClick={ this.createProyect.bind(this) }> <SaveOutlined /> Crear Proyecto</Button>);
        }
        return button;
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

        //------------------------------------------------------------------------
        const { tagsmethodologies, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
        const { tagsEntrepreneurs, inputVisible2, inputValue2, editInputIndex2, editInputValue2 } = this.state;
        return (
            <Content>
                <Row>
                    <Col span={7}>
                        <Form>
                              <Form.Item>
                                    <Input id="input" placeholder="Nombre del proyecto" value={this.state.nameProyect} name="nameProyect" onChange = {this.onChangeData.bind(this)}/> 
                              </Form.Item>

                              <Form.Item>
                                {tagsmethodologies.map((tag, index) => {
                                 if (editInputIndex === index) {
                                    return (
                                    <Input ref={this.saveEditInputRef} key={tag} size="small" className="tag-input"
                                    value={editInputValue} onChange={this.handleEditInputChange} onBlur={this.handleEditInputConfirm}
                                    onPressEnter={this.handleEditInputConfirm} /> );}

                                    const isLongTag = tag.length > 20;

                                    const tagElem = (
                                    <Tag className="edit-tag" key={tag} closable={index !== 0} onClose={() => this.handleClose(tag)}>
                                    <span onDoubleClick={e => {
                                    if (index !== 0) {
                                    this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                                    this.editInput.focus();
                                    });
                                    e.preventDefault();
                                    }}}>
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </span>
                                    </Tag>
                                    );
                                    return isLongTag ? (
                                    <Tooltip title={tag} key={tag}>
                                    {tagElem}
                                    </Tooltip>
                                    ) : (
                                    tagElem
                                    );
                                    })}
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


                              <Form.Item >
                                    <label>Lider del proyecto</label>
                                    <Input type="text"  value={localStorage.getItem("username")}></Input>
                              </Form.Item>

                              <Form.Item>
                                {tagsEntrepreneurs.map((tag, index) => {
                                 if (editInputIndex2 === index) {
                                    return (
                                    <Input ref={this.saveEditInputRef2} key={tag} size="small" className="tag-input"
                                    value={editInputValue2} onChange={this.handleEditInputChange2} onBlur={this.handleEditInputConfirm2}
                                    onPressEnter={this.handleEditInputConfirm2} /> );}

                                    const isLongTag = tag.length > 20;

                                    const tagElem = (
                                    <Tag className="edit-tag" key={tag} closable={index !== 0} onClose={() => this.handleClose2(tag)}>
                                    <span onDoubleClick={e => {
                                    if (index !== 0) {
                                    this.setState({ editInputIndex2: index, editInputValue2: tag }, () => {
                                    this.editInput.focus();
                                    });
                                    e.preventDefault();
                                    }}}>
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </span>
                                    </Tag>
                                    );
                                    return isLongTag ? (
                                    <Tooltip title={tag} key={tag}>
                                    {tagElem}
                                    </Tooltip>
                                    ) : (
                                    tagElem
                                    );
                                    })}
                                    {inputVisible2 && (
                                    <Input
                                    ref={this.saveInputRef2}
                                    type="text"
                                    size="small"
                                    className="tag-input"
                                    value={inputValue2}
                                    onChange={this.handleInputChange2}
                                    onBlur={this.handleInputConfirm2}
                                    onPressEnter={this.handleInputConfirm2}
                                    />
                                    )}
                                    {!inputVisible2 && (
                                    <Tag className="site-tag-plus" onClick={this.showInput2}>
                                    <PlusOutlined /> Emprendedores
                                    </Tag>
                                    )}
                              </Form.Item>

                              <Form.Item>
                                   {this.howIsButton()}
                              </Form.Item>
                        </Form>
                    </Col>
                    <Col span={16} push={1}>
                        <Table rowKey={recoder => recoder.idEvents } columns={columns} dataSource={this.state.data} ></Table>
                    </Col>

                </Row>
            </Content>
        )
    }
}

export default ProyectComponent;