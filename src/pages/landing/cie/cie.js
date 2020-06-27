import React from "react";
import { Row, Col, Button, Statistic } from "antd";
import Footer from '../footer';

import working from '../../../assets/working.svg'
import offer from '../../../assets/offer.svg'
import team from '../../../assets/team.svg'
import office from '../../../assets/office.svg'; 
import conect from '../../../assets/conect.svg'; 

import "./cie.css";

class Cie extends React.Component {

  onClickEvents = () =>{
    this.props.history.push("/inicio/events");
  }
  render() {
    return (
      <Row>
        <Col span={24}>
          <div className="Text_Principal"> 
            <h1 className="Text_Principal_H1">Centro de Inovación y Emprendimiento</h1>
            <h3 className="Text_Principal_H3">Ecosistema de emprendimiento de la Corporacion Universitaria Americana</h3>
          </div>
          <div className="Div_Img">
            <img src={working} className="Img_Working"/>
          </div>
          <div className="Text_Secondary">
            <h1 className="Text_Secondary_H1">Nuestra Plataforma</h1>
            <p className="Text_Secondary_P">Es un sistema de gestion que permite integrar los procesos y servicios</p>
            <p className="Text_Secondary_P">Del centro de inovación y emprendimiento</p>
          </div>
          <div className="Text_Secondary">
            <h1 className="Text_Secondary_H1">¿Que ofrecemos?</h1>
            <div className="Div_Img">
              <img className="Img_Offer" src={offer} />
            </div>
          
          </div>         
        </Col>
  
         <Col span={24}>
           <div className="Services">
              <div className="Services_Content">
                <p>Asesoria a los proyectos, por los docentes de la </p>
                <p>Corporacion Universitaria Americana</p>
                <div className="Div_Img">
                  <img className="Img_Team" src={team} />
                </div>
                <Button className="Button_Info" type="primary"> Conoce mas</Button>
              </div>
              <div className="Services_Content">
                <p>Espacios de co-working, para trabajar en</p>
                <p>tus proyectos</p>
                <div className="Div_Img">
                  <img className="Img_Team" src={office} />
                </div>
                <Button className="Button_Info" type="primary"> Conoce mas</Button>
              </div>
              <div className="Services_Content">
                <p>Te preparamos para presentarte en</p>
                <p> concursos y eventos</p>
                <div className="Div_Img">
                  <img className="Img_Team" src={conect} />
                </div>
                <Button className="Button_Info" type="primary" onClick={this.onClickEvents}> Conoce mas</Button>
              </div>
           </div>
          {/* <Entrepreneur /> */}
        </Col>
        <Col span={24}>
          <div className="Text_Tertiary">
              <h1 className="Text_Tertiary_H1">Con la plataforma Gestion CIE</h1>
              <p>Ayudamos a nuestros estudiantes a llevar a cabo sus emprendimientos</p>
              <p>gestionamos los servicios y eventos ofrecidos para la formación de</p>
              <p>nuestros emprendedores</p>
          </div>
          <div className="Text_Tertiary">
          <h1 className="Text_Tertiary_H1">Unete hoy, nuestro equipo de docentes te ayudara</h1>
          <Button type="primary" style={{width: '11%'}}>Unete</Button>
          </div>
          {/* <Information></Information> */}
        </Col>
        <Col span={24}>
          <div class="Statistics">
            <Statistic title="Proyectos Atendidos" value={30} />
            <Statistic title="Proyectos Culminados" value={30} />
          </div>
        </Col>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    );
  }
}

export default Cie;
