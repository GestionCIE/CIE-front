import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./public.css";

class Menu extends React.Component {
  render() {
    return (
      <Row className="row">
        <Col span={24} className="Menu">
          <Row>
            <Col>
              <Link to="/inicio/">CIE</Link>
            </Col>
            <Col>
              <Link to="/cie">Acerca de</Link>
            </Col>
            <Col>
              <Link to="/cie">Perfiles</Link>
            </Col>
            <Col>
              <Link to="/inicio/quienessomos">Quienes Somos</Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/inicio/signup">Iniciar Seccion</Link>
            </Col>
            <Col>
              <Link to="/inicio/signin">Registrarse</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Menu;
