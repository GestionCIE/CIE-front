import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Typography, Card, Layout, Modal } from "antd";
import Formulario from "./form";
import tutor from "../../../assets/img/tutor.jpg";
import Http from "../../../api/http";

const http = new Http();
const { Title } = Typography;
const { Content } = Layout;

class Events extends React.Component {
  state = {
    visible: false,
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({ visible: false });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({ visible: false });
  };

  handleModal = () => {
    this.setState({ visible: true });
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <Col xs={24} sm={16} md={12} lg={8} xl={8}>
        <Card
          onClick={this.handleModal}
          hoverable
          cover={
            <img
              src={
                this.props.eventImage !== undefined
                  ? this.props.eventImage
                  : tutor
              }
              alt="tutor"
            />
          }
        >
          <span className="card__name"> Nombre del evento: </span>
          {this.props.eventName}
          <br />
          <span className="card__date">Día del Evento:</span>
          {this.props.eventDate}
          <br />
          <span className="card__value"> Inscripción:</span>
          $100
          <br />
          <span className="card__ponent"> Ponente:</span>
          Marcos Aurelio
        </Card>
        <Modal
          centered
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Formulario
            key={this.props.idEvent}
            idEvent={this.props.idEvent}
            closeModal={this.closeModal}
          />
        </Modal>
      </Col>
    );
  }
}

class Services extends React.Component {
  render() {
    return (
      <Col xs={24} sm={18} md={12} lg={8} xl={8}>
        <Card hoverable cover={<img src={tutor} alt="tutor" />}>
          <span className="card__serviceName"> Servicio: </span>
          {this.props.serviceName}

          <br />
          <span className="card__serviceDesc">Descripción: </span>
          {this.props.serviceDescription}
        </Card>
      </Col>
    );
  }
}

function Information() {
  const [dataEvent, setDataEvent] = useState({ data: [] });
  const [dataService, setDataService] = useState({ data: [] });

  useEffect(() => {
    getDataEvent();
    getDataService();
  }, []);

  const getDataEvent = async () => {
    const data = [];

    const response = await http.get("event/getEvents");
    for (let i = 0; i < response.result.length; i++) {
      data.push(response.result[i]);
    }
    setDataEvent({ data });
  };

  const getDataService = async () => {
    const data = [];

    const response = await http.get("service/getServices");
    for (let i = 0; i < response.result.length; i++) {
      data.push(response.result[i]);
    }
    setDataService({ data });
  };

  return (
    <Content className="information">
      <Title level={3}>
        <h3 className="info-h3">Centro de Innovacion y Emprendimiento</h3>
      </Title>

      <div>
        <Row className="information__container--row">
          <>
            {dataEvent.data.map((event, index) => {
              return (
                <Events
                  idEvent={event.idEvents}
                  eventName={event.eventName}
                  eventDescription={event.eventDescription}
                  eventDate={event.eventDate.split("T")[0]}
                  eventImage={event.eventImage}
                />
              );
            })}

            {dataService.data.map((service, index) => {
              return (
                <Services
                  key={service.idServices}
                  serviceName={service.serviceName}
                  serviceDescription={service.serviceDescription}
                />
              );
            })}
          </>
        </Row>
      </div>
    </Content>
  );
}

export default Information;
