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
      {/*   <div className="entrepreneur">
        <Progress
          type="circle"
          percent={75}
          format={(percent) => `${percent} Emprendedores`}
        />
        <Progress type="circle" percent={100} format={() => "Done"} />
      </div> */}
    </React.Fragment>
  );
}

export default Entrepreneur;
