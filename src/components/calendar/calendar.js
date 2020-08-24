import React from "react";
import { Calendar, Row, Col } from "antd";
class CalendarC extends React.Component {
  render() {
    return (
      <Col>
        <Row>
          <Calendar />
        </Row>
      </Col>
    );
  }
}

export default CalendarC;
