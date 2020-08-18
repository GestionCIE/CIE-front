import React from "react";
import { Row, Col } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import ImgCalendar from "../../assets/calendar.svg";
import Footer from "./footer";
import Information from "./cie/information";

class newEvents extends React.Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <h1 className="Text_Primary_Event">Participa en nuestros eventos</h1>
        </Col>

        <Col span={24}>
          <div className="Content_Information">
            <img className="Img_Calendar" src={ImgCalendar} />
            <div className="Content_Information_H6">
              <h6>
                <CheckOutlined />
                Registrate en nuestros eventos y aprende mas sobre el
                emprendimiento
              </h6>
              <h6>
                <CheckOutlined />
                Alguno eventos son convocatorias para que te unas al CIE
              </h6>
              <h6>
                <CheckOutlined />
                Un evento es una oportunidad para hacer redes y concer gente
                nueva
              </h6>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="Content_Text_Event">
            <h1 className="Text_Primary_Event">Proximos eventos</h1>
            <Information />
          </div>
        </Col>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    );
  }
}

export default newEvents;
