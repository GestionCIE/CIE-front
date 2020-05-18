import React, { Component } from "react";
import { Table, Tabs, Col, Row, Button, Modal, Drawer ,Form, Input, Select, Checkbox, Tag, message} from "antd";
import ManagementApi from '../../api/management/managenmentApi';
import './management.css'; 
import AvatarComponent from './avatar';
const api = new ManagementApi();



const columns = [
  // {
  //   title: "Descripción",
  //   dataIndex: "description",
  //   key: "description",
  //   width: 300,
  //   /*     fixed: "left", */
  //   render: (description) => (
  //     <span>
  //       {description.map((desc) => {
  //         let colore = "grey";
  //         let n = desc.includes("Actividad");
  //         if (n === true) {
  //           colore = 800;
  //         }
  //         return (
  //           <span style={{ fontWeight: colore }} key={desc}>
  //             {desc}
  //           </span>
  //         );
  //       })}
  //     </span>
  //   ),
  // },
  {
    title: "Horas",
    dataIndex: "hours",
    key: "hours",
  },
  {
    title: "Valor/H",
    dataIndex: "valuehs",
    key: "valuehs",
  },
  {
    title: "Valor",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Semana 1",
    dataIndex: "sem1",
    key: "sem1",
  },
  {
    title: "Semana 2",
    dataIndex: "sem2",
    key: "sem2",
  },
  {
    title: "Semana 3",
    dataIndex: "sem3",
    key: "sem3",
  },
  {
    title: "Semana 4",
    dataIndex: "sem4",
    key: "sem4",
  },
  {
    title: "Semana 5",
    dataIndex: "sem5",
    key: "sem5",
  },
  {
    title: "Responsables",
    dataIndex: "resp",
    key: "resp",
  },
];
const f1 = [
  {
    key: "1",
    description: ["Actividad 1 - Evaluación de la organización"],
    hours: "",
    valuehs: "",
    value: "",
    sem1: "",
    sem2: "",
    sem3: "",
    sem4: "",
    sem5: "",
    resp: "",
  },
  {
    key: "2",
    description: [
      "Aplicación instrumento  para recopilar información  de la empresa",
    ],
    hours: 3,
    valuehs: "$50,000",
    value: "$150,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Carlos Fabregas",
  },
  {
    key: "3",
    description: ["Evaluación estado actual de la organización"],
    hours: 2,
    valuehs: "$50,000",
    value: "$100,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Carlos Fabregas",
  },
  {
    key: "4",
    description: ["Actividad 2 - Evaluación del Modelo de Negocios"],
    hours: "",
    valuehs: "",
    value: "",
    sem1: "",
    sem2: "",
    sem3: "",
    sem4: "",
    sem5: "",
    resp: "",
  },
  {
    key: "4",
    description: ["Taller : Modelo de Negocios"],
    hours: 3,
    valuehs: "$60,000",
    value: "$180,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Ivonne Alcendra",
  },
  {
    key: "4",
    description: ["Análisis de aspectos a revisar por empresario"],
    hours: 3,
    valuehs: "$60,000",
    value: "$180,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Ivonne Alcendra",
  },
];
const f2 = [
  {
    key: "1",
    description: ["Actividad 1-  Diseño de la propuesta de valor"],
    hours: "",
    valuehs: "",
    value: "",
    sem1: "",
    sem2: "",
    sem3: "",
    sem4: "",
    sem5: "",
    resp: "",
  },
  {
    key: "2",
    description: ["Taller:  validación  de necesidad y perfil del cliente"],
    hours: 3,
    valuehs: "$70,000",
    value: "$210,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Ilma Bonilla",
  },
  {
    key: "3",
    description: [
      "Taller  :  plantear  los  productos/servicios  que  ayudarán  a solucionar  el  problema/necesidad  para  ese  segmento  de clientes.  ",
    ],
    hours: 3,
    valuehs: "$70,000",
    value: "$210,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Ilma Bonilla",
  },
  {
    key: "4",
    description: ["Actividad 2 - Validación de la propuesta de valor"],
    hours: "",
    valuehs: "",
    value: "",
    sem1: "",
    sem2: "",
    sem3: "",
    sem4: "",
    sem5: "",
    resp: "",
  },
  {
    key: "5",
    description: ["Taller:  Diseño de prototipo  a validar"],
    hours: 3,
    valuehs: "$70,000",
    value: "$210,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Equipo CEI",
  },
  {
    key: "6",
    description: ["Diseño de Herramientas para validación"],
    hours: 2,
    valuehs: "$70,000",
    value: "$140,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "London No. 1 Lake Park",
  },
  {
    key: "7",
    description: ["Análisis de validación."],
    hours: 2,
    valuehs: "$70,000",
    value: "$140,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "London No. 1 Lake Park",
  },
];
const f3 = [
  {
    key: "1",
    description: ["Taller: Definición de lineamientos estrategicos"],
    hours: 3,
    valuehs: "$70,000",
    value: "$210,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Yesid Ariza",
  },
  {
    key: "2",
    description: ["Análisis de Factores críticos de éxito"],
    hours: 3,
    valuehs: "$50,000",
    value: "$150,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Yesid Ariza",
  },
  {
    key: "2",
    description: ["Taller: Modelo de comunicación Intregradas del Marketing"],
    hours: 3,
    valuehs: "$60,000",
    value: "$180,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Ivonne Alcendra",
  },
  {
    key: "2",
    description: [
      "Desarrollo  de  etrategias  de    comunicaciones  Integradas  del marketing",
    ],
    hours: "-",
    valuehs: "$ ",
    value: "$ ",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "-",
  },
];




const {Option} = Select;
const { TabPane } = Tabs;
class management extends Component {
  state = {
    visible: false,
    project: [],
    idProject: -1,
    phases: [],
    visibleDrawer: false,
    activity: '',
    responsables: '',
    stateActivity: '',
    phaseSelect: '',
    week: '',
    activities: [],
    assign: []
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
        this.setState({project: response.result, phases: phases });
      }
  }

  componentDidUpdate(){
    if(this.state.idProject != this.props.idProject){
      this.setState({idProject: this.props.idProject});
      this.getProject(this.props.idProject);
      this.getParticipants(this.props.idProject);
    }
  }

  showDetailRow = (data) =>{
    console.log(data);
    this.setState({activity: data.nameActivity});
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
    this.setState({responsables: options});
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

  componentWillUnmount(){
    this.setState({idProject: -1});
  }

  getActivities = async (id, phase) => {

    console.log("get Activities", id, " ", phase, " ");
    if(phase != ''){
      const response = await api.getActivityByProjectAndPhase(id, phase);
      console.log("Activities :", response);
      this.setState({ activities: response.result});
    }
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
      this.getActivities(this.props.idProject, this.state.phaseSelect);
      this.closeModal();
    }
  }

  render() {
    const states = [<Option key="1" value="1">En Ejecucion</Option>,<Option key="2" value="2">Cumplidad</Option> ];

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
        {
          this.props.idProject !== -1 ? 
          (<>
             
              <Col>
                  <Modal visible={this.state.visible}
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
                  <Drawer
                      title="Detalle de la actividad"
                      placement="right"
                      closable={false}
                      onClose={this.closeDrawer}
                      visible={this.state.visibleDrawer}
                  >
                  <Row>
                    <Col span={24}>
                        <p>Actividad</p>
                        <h6>{this.state.activity}</h6>
                    </Col>
                  </Row>
                  </Drawer>
                </Col>
                <Col span={24}>
                <Tabs defaultActiveKey="1" onTabClick={(key, e)=>{this.getActivities(this.props.idProject, key)}}>
                {
                  console.log("tam", this.state.phases[0]),
                  this.state.phases.map((phase, index)=>{
                    
                    return (<TabPane tab={phase} key={phase} >
                    <Button type="primary" onClick={()=>{this.setVisibleModalAndSetPhase(phase) }}>Crear Actividad</Button>
                    <Table
                      columns={originColumns}
                      pagination={false}
                      dataSource={this.state.activities}
                      scroll={{ x: 1200 }}
                      onRow={(recoder)=>{
                        return {
                          onClick: this.showDetailRow.bind(this, recoder)
                        }
                      }}
                    />

                  </TabPane>)
                  })

                }
                </Tabs>
            </Col>
        </>) : null
        }
       
      </Row>
    );
  }
}

export default management;
