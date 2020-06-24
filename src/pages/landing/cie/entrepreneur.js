import { Statistic, Row, Col /* Progress */ } from "antd";
import React from "react";
import { LikeOutlined } from "@ant-design/icons";

function Entrepreneur() {
  return (
    <React.Fragment>
      <Row className="entrepreneur">
        <Col span={8}>
          <Statistic
            title="Casos de exito"
            value={20}
            prefix={<LikeOutlined />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Los emprendedores en este semestre"
            value={20}
            suffix=""
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Entrepreneur;
