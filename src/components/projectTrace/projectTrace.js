import React from 'react';
import { List, Col, Row, Button, Modal, 
    Form, Input, Select, Tag,
    Avatar, Tooltip, Space, Divider, Steps, DatePicker, Checkbox } from "antd";
import StateOfActivivities from './chartsx';
import charImg from './../../assets/graph.svg';
import ManagementApi from '../../api/management/managenmentApi';
import './projectTrace.css';
const api = new ManagementApi();

const {Option} = Select;

const typegraphs = [
  {
     id: 1,
     content: 'cantidad de actividades'
  },
  {
    id: 2,
    content: 'estado de las actividades'
 }];

class ProjectTrace extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            projects: [],
            project:[],
            phases:[],
            nameAsesor: localStorage.getItem("username"),
            idProject: 0,
            typegraph: 0,
            visibleGraph: false,
            titleGraph: ''
            
        }

    }

    getProjecs(){
        let projects = [];
        const jsonasesor = {
            nameAsesor: this.state.nameAsesor
        }
        fetch('http://localhost:3005/project/getProjects2', {
            method: 'POST',
            body: JSON.stringify(jsonasesor),
            headers:{
                'Content-Type': 'application/json'
            }})
            .then(res=> res.json())
            .then((response)=>{
                console.log(response);
                for(let i=0; i < response.result.length; i++){
                    projects.push(response.result[i]);
                }
                this.setState({projects: projects});
                
            });
            console.log("datos table");
    }

    findTitleById(id) {
      for(let i=0; i < typegraphs.length; i++){
        if(typegraphs[i].id == id) {
          return typegraphs[i].content;
        }
      }
    }
    onChangeGetProfiles = async (id)=>{
       
        this.setState({
          idProject: id
        });
      }

      getProject = async (id) =>{
    
        let response  = await api.getProjectById(id);
        console.log("projectsssssss: ", response);
          if(response.result.length > 0){
            return {phases: response.phases , project: response.result};
          }
      }

      onChangeGraph = (id) =>{
        const title = this.findTitleById(id);
        console.log("title >>> ", title);
        this.setState({
          typegraph: id,
          titleGraph: title
        })
      }


      getGraph = () =>{
        this.setState(
          {visibleGraph: true}
        )
      }

    componentDidMount(){
        this.getProjecs();
     }


    render() {
       

        const data = {
            labels: this.state.phases,
            datasets:[
                {
                    label:"population",
                    data:[
                        7000,
                        5000,
                        3000
                    ],
                    backgroundColor:[
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ]
                }
            ]
        }
        return(
       <Row>
          <Col span={24}>
            <h3>Trazabilidad de proyectos</h3>
          </Col>
           <Col span={24}>
            <Space size={15}>
           <Select defaultValue="seleccione un proyecto" className="Select_Inputs"
            onChange={this.onChangeGetProfiles} >
               
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
           

           <Select defaultValue="seleccione un Repote" className="Select_Inputs" onChange={this.onChangeGraph} >
              ( 
               {typegraphs.map(item =>{
                 return (<Option value={item.id}>{item.content}</Option>)
               })}
           </Select>

           <Button type="primary" onClick={this.getGraph}>Graficar</Button>
           </Space>
           </Col>

           <Col span={24}>
             {
               this.state.visibleGraph ? (
                <StateOfActivivities idProject={this.state.idProject} typeGraph={this.state.typegraph}
                titleGraph={this.state.titleGraph}/>) :  <img className="Img_Char"src={charImg} />
             }
               
           </Col>
       </Row> 
    
        );
    }

}

export default ProjectTrace;