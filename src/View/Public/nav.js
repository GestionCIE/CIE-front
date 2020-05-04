import React from "react";
import { /* Menu, */ Row, Col /* Button  */ } from "antd";
import {
  /*  BrowserRouter as Router, Switch, Route,  */ Link,
} from "react-router-dom";
import "antd/dist/antd.css";
import "./public.css";

class Nav extends React.Component {
  render() {
    return (
      <Row className="row">
        <Col className="navbar">
          <Row>
            <Col>
              <div className="logo"></div>
            </Col>
            <Col>
              <Link to="/inicio/">CIE</Link>
            </Col>
            <Col>
              <Link to="/cie">Acerca de</Link>
            </Col>
            <Col>
              <Link to="/cie">Perfiles</Link>
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

export default Nav;
