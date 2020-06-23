import React from "react";
import { Carousel, Row, Col /* , Typography  */ } from "antd";
import Information from "./information";
import Entrepreneur from "./entrepreneur";
import cie from "../../../assets/img/cie.jpg";
import Nav from "../nav";
import "./cie.css";

class Cie extends React.Component {
  render() {
    return (
      
      <Row>
        <Col span={24}>
          <Carousel autoplay className="carousel">
            <div>
              <img src={cie} alt="cie" />
            </div>
            <div>
              <img
                src={cie}
                alt="
                cie
              "
              />
            </div>
            <div>
              <img src={cie} alt="cie" />
            </div>
            <div>
              <img
                src={cie}
                alt="
                cie
              "
              />
            </div>
            <div>
              <img src={cie} alt="cie" />
            </div>
            <div>
              <img
                src={cie}
                alt="
                cie
              "
              />
            </div>
          </Carousel>
        </Col>
        <Col span={24}>
          <Entrepreneur />
        </Col>
        <Col span={24}>
          <Information></Information>
        </Col>
      </Row>
    );
  }
}

export default Cie;
