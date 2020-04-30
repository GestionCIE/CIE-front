import React, { useState } from "react";
import Formulario from "./form";
import { Row, Col, Typography, Card, Layout, Modal } from "antd";
import tutor from "../../../assets/img/tutor.jpg";
const { Title } = Typography;
const { Content } = Layout;

function Information() {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };
  return (
    <Content className="information">
      <Title level={3}>
        <h3 className="info-h3">Centro de Innovacion y Emprendimiento</h3>
      </Title>

      <div information__container>
        <Row className="information__container--row">
          <Col xs={24} sm={16} md={12} lg={8} xl={8}>
            <Card
              onClick={showModal}
              hoverable
              cover={<img src={tutor} alt="tutor" />}
            >
              <span className="card__name"> Nombre del evento: </span>
              Seminario de sitios web <br />
              <span className="card__date">Día del Evento:</span> Miercoles 19 a
              las 18:00 hs
              <br />
              <span className="card__value"> Inscripción:</span> $100 <br />
              <span className="card__ponent"> Ponente:</span> Marcos Aurelio
            </Card>
            <Modal
              centered
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Formulario />
            </Modal>
          </Col>
          <Col xs={24} sm={16} md={12} lg={8} xl={8}>
            <Card hoverable cover={<img src={tutor} alt="tutor" />}>
              <span className="card__name"> Nombre del evento: </span>
              Seminario de sitios web <br />
              <span className="card__date">Día del Evento:</span> Miercoles 19 a
              las 18:00 hs
              <br />
              <span className="card__value"> Inscripción:</span> $100 <br />
              <span className="card__ponent"> Ponente:</span> Marcos Aurelio
            </Card>
          </Col>
          <Col xs={24} sm={16} md={12} lg={8} xl={8}>
            <Card hoverable cover={<img src={tutor} alt="tutor" />}>
              <span className="card__name"> Nombre del evento: </span>
              Seminario de sitios web <br />
              <span className="card__date">Día del Evento:</span> Miercoles 19 a
              las 18:00 hs
              <br />
              <span className="card__value"> Inscripción:</span> $100 <br />
              <span className="card__ponent"> Ponente:</span> Marcos Aurelio
            </Card>
          </Col>
          <Col xs={24} sm={16} md={12} lg={8} xl={8}>
            <Card hoverable cover={<img src={tutor} alt="tutor" />}>
              <span className="card__serviceName"> Servicio: </span>
              Co-Working <br />
              <span className="card__serviceDesc">Descripción: </span>Lorem
              ipsum dolor, sit amet consectetur adipisicing elit. Doloribus nemo
              placeat nesciunt alias tempore? Quos minus assumenda voluptate
              exercitationem quisquam quasi labore at, tenetur modi velit,
              dolorum accusantium nemo corporis.
            </Card>
          </Col>
          <Col xs={24} sm={16} md={12} lg={8} xl={8}>
            <Card hoverable cover={<img src={tutor} alt="tutor" />}>
              <span className="card__serviceName"> Servicio: </span>
              Co-Working <br />
              <span className="card__serviceDesc">Descripción: </span>Lorem
              ipsum dolor, sit amet consectetur adipisicing elit. Doloribus nemo
              placeat nesciunt alias tempore? Quos minus assumenda voluptate
              exercitationem quisquam quasi labore at, tenetur modi velit,
              dolorum accusantium nemo corporis.
            </Card>
          </Col>
          <Col xs={24} sm={18} md={12} lg={8} xl={8}>
            <Card hoverable cover={<img src={tutor} alt="tutor" />}>
              <span className="card__serviceName"> Servicio: </span>
              Co-Working <br />
              <span className="card__serviceDesc">Descripción: </span>Lorem
              ipsum dolor, sit amet consectetur adipisicing elit. Doloribus nemo
              placeat nesciunt alias tempore? Quos minus assumenda voluptate
              exercitationem quisquam quasi labore at, tenetur modi velit,
              dolorum accusantium nemo corporis.
            </Card>
          </Col>
        </Row>
      </div>
    </Content>
  );
}

export default Information;
