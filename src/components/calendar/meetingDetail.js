import React from "react";
import { Drawer, Card, Row, Col, Space, Button, Avatar, Tooltip } from "antd";

import Http from "./../../api/http";
import FormItemInput from "antd/lib/form/FormItemInput";

// const http = new Http();

class MeetingDetail extends React.Component {
  // state = {
  //   responsable: {
  //     name: "",
  //     image: "",
  //   },
  //   guests: [],
  // };

  componentDidMount() {
    console.log("Details props ", this.props.detail);
  }

  // componentDidUpdate() {
  //   console.log("Details props UPDATE", this.props.detail);
  // }

  render() {
    const { visibleDetail, closeDetail, detail } = this.props;
    return (
      <Drawer
        visible={visibleDetail}
        onClose={closeDetail}
        width="30%"
        title="Reuniones Pendientes"
      >
        {detail != undefined
          ? detail.map((item) => {
              return (
                <Card className="Card_Detail_Meeting">
                  <Row>
                    <Col span={24}>
                      <Space size={8}>
                        <p>
                          <strong>Titulo: </strong>
                        </p>
                        <p> {item.title}</p>
                        <Button type="danger"> Cancelar Reunión </Button>
                      </Space>
                    </Col>
                    <Col span={24}>
                      <Space size={8}>
                        <p>
                          <strong>Proposito</strong>
                        </p>
                      </Space>
                      <p>{item.purpose}</p>
                    </Col>
                    <Col span={24}>
                      <Space size={8}>
                        <p>
                          <strong>Responsable</strong>
                          <Tooltip
                            title={item.responsable[0].name}
                            placement="bottom"
                          >
                            <Avatar
                              src={item.responsable[0].image}
                              alt={item.responsable[0].name}
                            />
                          </Tooltip>
                        </p>
                      </Space>
                    </Col>
                    <Col span={24}>
                      <p>
                        <strong>Invitados</strong>
                        <br />
                        {item.guests.map((guest) => {
                          return (
                            <Space size={20}>
                              <Tooltip title={guest.name} placement="bottom">
                                <Avatar src={guest.image} alt={guest.name} />
                              </Tooltip>
                            </Space>
                          );
                        })}
                      </p>
                    </Col>
                  </Row>
                </Card>
              );
            })
          : null}
      </Drawer>
    );
  }
}

export default MeetingDetail;
