import React, { Component } from "react";
import { Table, Tabs, Col, Row, Button, Modal, Drawer ,Form, Input, Select, Checkbox, Tag } from "antd";
import ManagementApi from '../../api/management/managenmentApi';
import './management.css'; 
const api = new ManagementApi();

const columns = [
  {
    title: "Descripción",
    dataIndex: "description",
    key: "description",
    width: 300,
    /*     fixed: "left", */
    render: (description) => (
      <span>
        {description.map((desc) => {
          let colore = "grey";
          let n = desc.includes("Actividad");
          if (n === true) {
            colore = 800;
          }
          return (
            <span style={{ fontWeight: colore }} key={desc}>
              {desc}
            </span>
          );
        })}
      </span>
    ),
  },
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
<<<<<<< HEAD
=======

>>>>>>> feature-dinamic-menu
const {Option} = Select;
const { TabPane } = Tabs;
class management extends Component {
  state = {
    visible: false,
    project: [],
    idProject: -1,
    phases: [],
    visibleDrawer: false,
    nameActivity: '',
    responsables: '',
    state: '',
    phaseSelect: '',
    week: ''
  };

  constructor(){
    super();
    this.showDetailRow = this.showDetailRow.bind(this);
  }

  setVisibleModal = ()=>{
    this.setState({visible: true});
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
    this.setVisibleDrawer();
  }
  getResponsables = (values)=>{
    this.setState({responsables: values});
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
    this.setState({state: value});
  }
  setPhase(phase){
<<<<<<< HEAD
    localStorage.setItem("phase", phase);
    if(this.state.phaseSelect == ''){
      // this.setState({phaseSelect: phase});
=======
    console.log(phase, " : ",this.state.phaseSelect);
    if(this.state.phaseSelect != phase){
        this.setState({phaseSelect: phase});
>>>>>>> feature-dinamic-menu
    }
  }

  changeData = (e) =>{
    this.setState({[e.target.name]: e.target.value});
  }

  changeWeek = (e, index) =>{
    console.log("value", e, " index", index);
    this.setState({week: e.target.name});
  }

<<<<<<< HEAD
=======
  componentWillUnmount(){
    this.setState({idProject: -1});
  }

>>>>>>> feature-dinamic-menu
  render() {
    const states = [<Option key="1">En Ejecucion</Option>,<Option key="2">Cumplidad</Option> ]
    return (
      <Row>
        {
<<<<<<< HEAD
          this.props.idProject !== undefined ? 
=======
          this.props.idProject !== -1 ? 
>>>>>>> feature-dinamic-menu
          (<>
             
              <Col>
                  <Modal visible={this.state.visible}
                    onCancel = {this.closeModal}>
                    <Form className="Form_Modal">
                      <Form.Item>
                            <h6>Fase Metodologica Actual</h6>
<<<<<<< HEAD
                            <Tag color="blue">{localStorage.getItem("phase")}</Tag>
=======
                            <Tag color="blue">{this.state.phaseSelect}</Tag>
>>>>>>> feature-dinamic-menu
                      </Form.Item>
                      <Form.Item>
                        <Input placeholder="Actividad" value={this.nameActivity} onChange={this.changeData}/>
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
                  <Button type="primary" onClick={this.setVisibleModal}>Crear Actividad</Button>
                  <Drawer
                      title="Detalle Actividades"
                      placement="right"
                      closable={false}
                      onClose={this.closeDrawer}
                      visible={this.state.visibleDrawer}
                  >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                  </Drawer>
                </Col>
                <Col span={24}>
                <Tabs defaultActiveKey="1">
                {
                  console.log("tam", this.state.phases[0]),
                  this.state.phases.map((phase, index)=>{
                    
                    return (<TabPane tab={phase} key={index} >
                    <Table
                      columns={columns}
                      pagination={false}
                      dataSource={f1}
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

                  {/* <TabPane tab="Fase 1" key="1">
                    <Table
                      columns={columns}
                      pagination={false}
                      dataSource={f1}
                      scroll={{ x: 1200 }}
                    />
                  </TabPane>
                  <TabPane tab="Fase 2" key="2">
                    <Table
                      columns={columns}
                      pagination={false}
                      dataSource={f2}
                      scroll={{ x: 1200 }}
                    />
                  </TabPane>
                  <TabPane tab="Fase 3" key="3">
                    <Table
                      columns={columns}
                      pagination={false}
                      dataSource={f3}
                      scroll={{ x: 1200 }}
                    />
                  </TabPane> */}
                </Tabs>
            </Col>
        </>) : null
        }
       
      </Row>
    );
  }
}

export default management;
