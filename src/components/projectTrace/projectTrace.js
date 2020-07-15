import React from 'react';
import { Col, Row, Button, Select, Space} from "antd";
import StateOfActivivities from './chartsx';
import charImg from './../../assets/graph.svg';
import ManagementApi from '../../api/management/managenmentApi';
import './projectTrace.css';

import GranttGraph from './granttGraph';

import Http from './../../api/http';

const http = new Http();
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
 }, 
 {
  id: 3,
  content: 'Calificacion de las actividades'
 },
 {
  id: 4,
  content: 'Diagrama de Grantt'
 }];

class ProjectTrace extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            projects: [],
            project:[],
            phases:[],
            phase: '',
            nameAsesor: localStorage.getItem("username"),
            idProject: 0,
            typegraph: 0,
            visibleGraph: false,
            grantt: false,
            otherControls: false,
            titleGraph: ''
            
        }

    }

    async getProjects(){
        let projects = [];
        const jsonasesor = {
            nameAsesor: this.state.nameAsesor
        };
        
        const response = await http.post('project/getProjects2', jsonasesor);
        for(let i=0; i < response.result.length; i++){
          projects.push(response.result[i]);
        }
        this.setState({projects: projects});
        console.log("datos table");
    }

    async getAllProjects(){
      
      const response = await http.get(`project/getProjects?type=${localStorage.getItem('role')}`);
      this.setState({
        projects: response.result
      })
    }

    async getPhases() {
      const response = await http.get(`project/phases?id=${this.state.idProject}`);
      const phases =  response.result.methodologicalPhases.split(',');
      this.setState({
        phases: phases
      });
    }


  findTitleById(id) {
      for(let i=0; i < typegraphs.length; i++){
        if(typegraphs[i].id == id) {
          return typegraphs[i].content;
        }
      }
    }
    onChangeGetProfiles = (id)=>{
       
        this.setState({
          idProject: id
        });
      }

      onChangeGraph = (id) =>{
        const title = this.findTitleById(id);
        console.log("title >>> ", title, " >>> id ", 4);
        if(id == 4) {
          this.setState({
            typegraph: id,
            titleGraph: title,
            otherControls: true,
          });
          this.getPhases();
        }else {
          this.setState({
            visibleGraph: true,
            typegraph: id,
            titleGraph: title,
            grantt : false,
            otherControls: false,
          })
        }
      }


      onChangeGantt = (phase) =>{
        console.log(phase);
        this.setState({
          visibleGraph: false,
          phase: phase, 
         
          grantt : true,
        })
      }

      reset = () =>{
        this.setState({
          visibleGraph: false,
          grantt: false,
          otherControls: false,
        })
      }

    componentDidMount(){
        if(localStorage.getItem('role') === 'adviser'){
          this.getProjects();
        }else if (localStorage.getItem('role') === 'administrator'){
          this.getAllProjects();
        }
        
     }

    render() {
        return(
       <Row>
          <Col span={24}>
            <h3>Trazabilidad de proyectos</h3>
          </Col>
           <Col span={24}>
            <Space size={15}>
       
           <Select defaultValue="seleccione un proyecto" className="Select_Inputs"
            onChange={ this.onChangeGetProfiles } >
               
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


           {this.state.otherControls ? <Select defaultValue="Seleciona una Fase" className="Select_Inputs" onChange={this.onChangeGantt}>
            { this.state.phases.map(item => {
               return (<Option value={item}> {item} </Option>)
              })
            }    
           </Select> : null}

           <Button type="primary" onClick={this.reset}>Valores por defecto</Button>
           </Space>
           </Col>

           <Col span={24}>
             {
               this.state.visibleGraph ? (
                <StateOfActivivities idProject={this.state.idProject} typeGraph={this.state.typegraph}
                titleGraph={this.state.titleGraph}/>) : this.state.grantt ? (<GranttGraph idProject={this.state.idProject}
                  phase={this.state.phase}/>) : <img className="Img_Char"src={charImg} /> 
             }               
           </Col>
       </Row> 
        );
    }

}

export default ProjectTrace;

 