import React from "react";
import { Col, Row } from "antd";
import Footer from '../footer';
import "./projects.css";
import emprendimientos from "../../../assets/img/emprendimientos.png"



class Projects extends React.Component {

  render(){
    return(
      
      <Row>
      <Col span={24}>
      <div className="componenteTitulo">
        <span>EMPRENDIMIENTOS</span>
      </div>
      </Col >


      <Col span={12}>
      <div>
      <img src={emprendimientos} style={{padding:'20px'}}/>
      </div>
      </Col>
     
      <Col span={12}>
      <div className="txtemprendimientos">
      <span>Somos un centro de desarrollo
      empresarial e innovación, con conocimiento
      especializado en la creación de valor y el
      incremento en ventas</span>
      </div>
      </Col>

      <Col span={24}>
      <div className="componenteTitulo">
        <span>NUESTRA MOTIVACIÓN</span>
      </div>
      </Col >
    
      


      <Col span={6}>
      <div className="txtvalores">
      <span>Nuevas Empresas</span>
      <div className="circulo" style={{backgroundColor: '#F8931F'}}>
        <span>10</span>
      </div>
      </div>
      </Col>

      <Col span={6}>
      <div className="txtvalores">
      <span>Proyectos Culminados</span>
      <div className="circulo" style={{backgroundColor: '#8662A6'}}>
        <span>45</span>
      </div>
      </div>
      </Col>

      <Col span={6}>
      <div className="txtvalores">
      <span>Emprendimientos</span>
      <div className="circulo" style={{backgroundColor: '#7B7AFE'}}>
        <span>78</span>
      </div>
      </div>
      </Col>

      <Col span={6}>
      <div className="txtvalores">
      <span>Emprendedores</span>
      <div className="circulo" style={{backgroundColor: '#6FDD4F'}}>
        <span>14</span>
      </div>
      </div>
      </Col>





      


      <Col span={24}>
      <div className="componenteTitulo">
        <span>ALGUNOS DE NUESTROS EMPRENDEDORES</span>
      </div>
      </Col >


      <Col span={6}>
      <div className="seccionNuestrosEmprendedores">
      
      <div className="circuloEmprendimientos" style={{backgroundColor: '#6FDD4F'}}>
         <span></span>
      </div>
      </div>
      </Col>

      <Col span={18}>
      <div className="seccionNuestrosEmprendedores">
      <div className="contenidoEmprendimientos">
      <span>Nombre del proyecto: </span><div></div>
      <span>Emprendedor: </span>
      <div></div>
      <span>Descripción:</span>
        <span>Lorem ipsum dolor sit amet consectetur adipiscing elit justo placerat congue, netus nullam lobortis lacinia sem mollis nibh erat sed dictumst, cubilia nulla suspendisse gravida vitae accumsan ornare consequat interdum. Tincidunt et at senectus scelerisque ante ac accumsan pulvinar commodo, curabitur convallis congue augue faucibus enim est sapien. Integer ridiculus neque magnis mauris laoreet maecenas facilisi tortor at tristique sociosqu egestas cubilia, volutpat torquent massa cursus tincidunt phasellus nibh pellentesque taciti commodo venenatis malesuada.</span>
      </div>
      </div>
      </Col>


      <Col span={6}>
      <div className="seccionNuestrosEmprendedores">
      
      <div className="circuloEmprendimientos" style={{backgroundColor: '#6FDD4F'}}>
         <span></span>
      </div>
      </div>
      </Col>

      <Col span={18}>
      <div className="seccionNuestrosEmprendedores">
      <div className="contenidoEmprendimientos">
      <span>Nombre del proyecto: </span><div></div>
      <span>Emprendedor: </span>
      <div></div>
      <span>Descripción:</span>
        <span>Lorem ipsum dolor sit amet consectetur adipiscing elit justo placerat congue, netus nullam lobortis lacinia sem mollis nibh erat sed dictumst, cubilia nulla suspendisse gravida vitae accumsan ornare consequat interdum. Tincidunt et at senectus scelerisque ante ac accumsan pulvinar commodo, curabitur convallis congue augue faucibus enim est sapien. Integer ridiculus neque magnis mauris laoreet maecenas facilisi tortor at tristique sociosqu egestas cubilia, volutpat torquent massa cursus tincidunt phasellus nibh pellentesque taciti commodo venenatis malesuada.</span>
      </div>
      </div>
      </Col>


      <Col span={6}>
      <div className="seccionNuestrosEmprendedores">
      
      <div className="circuloEmprendimientos" style={{backgroundColor: '#6FDD4F'}}>
         <span></span>
      </div>
      </div>
      </Col>

      <Col span={18}>
      <div className="seccionNuestrosEmprendedores">
      <div className="contenidoEmprendimientos">
      <span>Nombre del proyecto: </span><div></div>
      <span>Emprendedor: </span>
      <div></div>
      <span>Descripción:</span>
        <span>Lorem ipsum dolor sit amet consectetur adipiscing elit justo placerat congue, netus nullam lobortis lacinia sem mollis nibh erat sed dictumst, cubilia nulla suspendisse gravida vitae accumsan ornare consequat interdum. Tincidunt et at senectus scelerisque ante ac accumsan pulvinar commodo, curabitur convallis congue augue faucibus enim est sapien. Integer ridiculus neque magnis mauris laoreet maecenas facilisi tortor at tristique sociosqu egestas cubilia, volutpat torquent massa cursus tincidunt phasellus nibh pellentesque taciti commodo venenatis malesuada.</span>
      </div>
      </div>
      </Col>

      
      <Col span={24}>
      <Footer/>
      </Col>
      </Row>


      
    )
  }
}



export default Projects;
