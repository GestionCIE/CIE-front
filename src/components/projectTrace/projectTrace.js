import React from 'react';
import { List, Col, Row, Button, Modal, 
    Form, Input, Select, Tag,
    Avatar, Tooltip, Space, Divider, Steps, DatePicker, Checkbox } from "antd";
import {Bar, Line, Pie} from "react-chartjs-2";
import ManagementApi from '../../api/management/managenmentApi';
const api = new ManagementApi();

const {Option} = Select;


class ProjectTrace extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            projects: [],
            project:[],
            phases:[],
            nameAsesor: localStorage.getItem("username"),
            
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


    onChangeGetProfiles = async (id)=>{
        if(id != '-1'){
          const {phases, project} = await this.getProject(id);
          const fases = phases.map((phases, i) =>{
            return(
            phases.phase   
            );
        })
          //console.log("Phase[0]", phases[0].phase);
          this.setState({
            project: project,
            phases: fases,
          });

          
        }
      }

      getProject = async (id) =>{
    
        let response  = await api.getProjectById(id);
        console.log("projectsssssss: ", response);
          if(response.result.length > 0){
            return {phases: response.phases , project: response.result};
          }
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
            <Space size={15}>
           <Select defaultValue="seleccione un proyecto" className="select_project"
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
           

           <Select defaultValue="seleccione un Repote" className="select_Reporte" >
               <Option value="1"> cantidad de actividades </Option>
               <Option value="2"> opcion 2 </Option>
               <Option value="3"> opcion 3 </Option>
           </Select>

           <button>Graficar</button>
           </Space>


           </Col>

           <Col span={10}>
               <Bar data={data}
               options={{}}></Bar>
           </Col>
       </Row> 
    
        );
    }

}

export default ProjectTrace;