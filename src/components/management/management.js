import React, { Component } from "react";
import { List, Tabs, Col, Row, Button, Modal, 
  Form, Input, Select, Checkbox, Tag, message,
  Avatar, Tooltip, Space, Divider, Steps } from "antd";
import ManagementApi from '../../api/management/managenmentApi';
import './management.css'; 
import AvatarComponent from './avatar';
import DetailActivity from './detailActivity';
import ContentTabs from './contentTabs';

import img_management from '../../assets/management.svg';
import { BorderOutlined } from "@ant-design/icons";
const api = new ManagementApi();

const {Step}  = Steps;
const {Option} = Select;
const { TabPane } = Tabs;
const { info } = Modal;

const steps_titles = [
  {
    title: '1'
  },
  {
    title: '2'
  }
];
class management extends Component {
  state = {
    visibleBtn: 'none',
    visible: false,
    visibleImg: 'block',
    project: [],
    projects:[],
    idProject: -1,
    phases: [],
    visibleDrawer: false,
    detailtActivity: [],
    responsables: '',
    stateActivity: '',
    phaseSelect: '',
    week: '',
    activities: [],
    assign: [],
    names:[],
    advisor: '',
    showComponent: false,
    key:''
  };

  constructor(){
    super();
    this.showDetailRow = this.showDetailRow.bind(this);
  }

  getState(state) {
    console.log("state ", typeof state);
    let stateHtml = null;
    switch (state) {
      case '1':
        stateHtml = (<Tag color='processing'>En ejecucion</Tag>)
        break;
      case '2':
        stateHtml =  (<Tag color='success'> Termindo </Tag>)
        break;
      default:
        stateHtml = (<Tag color='default'>Sin estado</Tag>)
        break;
    }
  
    return stateHtml;
  }

  setVisibleModalAndSetPhase = (data)=>{
    console.log("data", data);
    this.setState({visible: true, phaseSelect: data});
  }

  setVisibleDrawer = ()=>{
    this.setState({visibleDrawer: true});
  }

  closeModal = () =>{
    this.setState({visible: false});
  }

  closeDrawer = ()=>{
    this.setState({visibleDrawer: false});
  }

  getProject = async (id) =>{
    
    let response  = await api.getProjectById(id);
      if(response.result.length > 0){
        const phases = response.result[0].methodologicalPhases.split(",");
        return {phases: phases, project: response.result};
      }
  }


  async getAllProjects() {
    const response = await api.getProjects(localStorage.getItem('role'), localStorage.getItem('username'));
    this.setState({projects: response.result});
  }

  componentDidMount(){
    this.getAllProjects();
  }

  showDetailRow = (data) =>{
    console.log(data);
    this.setState({ detailtActivity: data, showComponent:true});
    this.setVisibleDrawer();
  }
  getResponsables = (values)=>{
    this.setState({assign: values});
    this.getParticipants(this.props.idProject);
  }

  getParticipants = async (id)=>{
    let options = [];
    const response = await api.getParticipants(id)
    options.push(<Option value={response.result.advisor} key={0}>{response.result.advisor}</Option>)
    for(let i=0; i < response.result.entrepreneurs.length; i++){
      options.push(<Option value={response.result.entrepreneurs[i].name}
         key={i+1}>{response.result.entrepreneurs[i].name}</Option>)
    }
    console.log(options);
    return options;
  }

  getStates = (value)=>{
    this.setState({stateActivity: value});
  }
  setPhase(phase){
    console.log(phase, " : ",this.state.phaseSelect);
    if(this.state.phaseSelect != phase){
        this.setState({phaseSelect: phase});
    }
  }

  changeData = (e) =>{
    console.log(e.target.name, " ", e.target.value );
    this.setState({[e.target.name]: e.target.value});
  }

  changeWeek = (e, index) =>{
    console.log("value", e, " index", index);
    this.setState({week: e.target.name});
  }

  getActivities = async (id, phase) => {

      const response = await api.getActivityByProjectAndPhase(id, phase);
      console.log("Activities :", response);
      return response.result;
  }

  getProfiles(_nameshort, _responsables){
    let htmlProfile = `<div>`;  
    const responsables =  _responsables.split(',');
    const nameshort = _nameshort.split(',');
      if(responsables.length > 0) {
        for(let i=0; i < responsables.length; i++){
          htmlProfile = htmlProfile + 
          `<Tooltip placement="top" title={${responsables[i]}}>
              <Avatar>{${nameshort[i]}}</Avatar>
          </Tooltip>`
        } 
         htmlProfile = htmlProfile + `</div>`
      }else{
        htmlProfile = <span>Error no se puede obtener los responsables</span>
      }
      return (htmlProfile);
  }

  createActivity = async () =>{
    console.log(this.state.activity);
    console.log(this.state.phaseSelect);
    console.log(this.state.assign);
    console.log(this.state.stateActivity);
    let assings = '';
    
    for(let i=0; i < this.state.assign.length; i++){
      console.log("...",this.state.assign[i]);
      assings = ((i + 1) == this.state.assign.length) 
      ?  assings + this.state.assign[i] : assings + this.state.assign[i] + ","; 
    }
    console.log("assings", assings);
    const data = {
      nameActivity: this.state.activity ,
      responsables:assings , 
      state: this.state.stateActivity[0],
      phase: this.state.phaseSelect,
      id: this.props.idProject
    };

    const response = await api.createActivity(data);
    
    if(response.result  == 'created'){
      message.success('se creo la actividad')
      this.callgetActivities(this.state.idProject, this.state.phaseSelect);
      this.closeModal();
    }
  }

  callgetActivities = async (id, phase) => {
    const activities = await this.getActivities(id, phase);
    this.setState({activities: activities});
  }

  onChangeGetProfiles = async (id)=>{
    if(id != '-1'){
      const response = await api.getParticipants(id);
      const {phases, project} = await this.getProject(id);
      const options  = await this.getParticipants(id);
      const activities = await this.getActivities(this.state.idProject, phases[0])
      console.log("Phase[0]", phases[0]);
      this.setState({
        names: response.result.entrepreneurs,
        advisor: response.result.advisor,
        visibleBtn: 'block',
        visibleImg: 'none',
        idProject: id,
        project: project,
        phases: phases,
        responsables: options,
        activities: activities,
        key: phases[0]
      });
    }else {
      info({content: "Usted no tiene ningun proyecto asociado"});
    }
    
  }

  render() {
    const states = [<Option key="1" value="1">En Ejecucion</Option>,<Option key="2" value="2">Cumplidad</Option> ];
    const data = [ 'preincuvacíon', 'incuvación', 'aceleración'];
    const originColumns  = [{
      title: "Actividad",
      dataIndex: "nameActivity",
      key: "nameActivity",
    },{
      title: "Responsables",
      dataIndex: "responsables",
      key: "responsables",
      render: (text, recoder) => <AvatarComponent profiles={recoder.profile} />
    },
    {
      title: "Estado de la actividad",
      dataIndex: "state",
      key: "state",
      render: (text, recoder)=> this.getState(recoder.state)
    }];
    return (
      <Row>
        <Col>
          <h3>Gestion de proyectos</h3>
         
        </Col>
        <Col span={20}>
        <Space size={8}>
        <div className="Content_Select">
          <p>Seleciona un proyecto</p>
          <Select className="Select_Project"
              defaultValue="Selecione Un Proyecto"
              onChange={this.onChangeGetProfiles}
            >
            {this.state.projects.length > 0 ? (
                this.state.projects.map((project, index) => {
                  return (
                    <Option value={project.idProject}>
                      {project.projectName}
                    </Option>
                  );
                })
              ) : (
                <Option value="-1">No hay Projectos</Option>
              )}
              
            </Select>
        
        </div>
        <div className="Div-Avatar">
            <Space size={8}>
              {this.state.names.map((profile, index) => {
                return (
                  <Tooltip placement="top" title={profile.name}>
                    <Avatar>{profile.nameshort}</Avatar>
                  </Tooltip>
                );
              })}
                {
                  this.state.advisor != '' ?  <> <span>Asesor</span> 
                  <Tooltip placement="top" title={this.state.advisor} >
                      <Avatar >{this.state.advisor}</Avatar>
                  </Tooltip> </>: null
                  }
            </Space>
          </div>
          </Space>
          <Modal visible={this.state.visible}
            title="Crear Actividad"
            onCancel = {this.closeModal}
            onOk = {this.createActivity}>
            <Form className="Form_Modal">
              <Form.Item>
                    <h6>Fase Metodologica Actual</h6>
                    <Tag color="blue">{this.state.phaseSelect}</Tag>
              </Form.Item>
              <Form.Item>
                <Input placeholder="Actividad" name='activity' value={this.state.activity} onChange={this.changeData}/>
              </Form.Item>
              <Form.Item>
                  <Select 
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Asignar a"
                    onChange={this.getResponsables}>
                    {this.state.responsables}
                  </Select>
              </Form.Item>
              <Form.Item>
                  <Select 
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Progreso"
                        onChange={this.getStates}>
                        {states}
                      </Select>
              
              </Form.Item>
                    
              <Form.Item>
                  <Checkbox name="1" onChange={this.changeWeek}>
                    Semana 1
                  </Checkbox>
                  <Checkbox name="2" onChange={this.changeWeek}>
                    Semana 2
                  </Checkbox>
                  <Checkbox name="3" onChange={this.changeWeek} >
                    Semana 3
                  </Checkbox>
                  <Checkbox name="4" onChange={this.changeWeek}>
                    Semana 4
                  </Checkbox> <br/>
                  <Checkbox name="5" onChange={this.changeWeek}>
                    Semana 5
                  </Checkbox>
              </Form.Item>
            </Form>
          </Modal>
          {
            this.state.showComponent ? <DetailActivity visibleDrawer={this.state.visibleDrawer}
            closeDrawer={this.closeDrawer} detailtActivity={this.state.detailtActivity}  /> : null
          }
       
          <Divider /> 
        </Col>
        <Col span={24}>
              <Row>
                <Col span={24}>
                  <div className="Content_Img" style={{display: this.state.visibleImg}}>
                    <img className="Img_Management"src={img_management}/>
                  </div>
                  <div className="Content_Methodologies">
                      <List header={<h5>Fases Metodologicas</h5>}
                        bordered
                        dataSource={this.state.phases}
                        renderItem={ 
                          item => (
                            <List.Item>
                              <span>{item}</span>
                            </List.Item>
                          )
                        }
                      >

                      </List>
                  </div>
                </Col>
              </Row>
        </Col>
      </Row>
    );
  }
}

export default management;
