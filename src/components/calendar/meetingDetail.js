import React from "react";
import {
  Drawer,
  Card,
  Row,
  Col,
  Space,
  Button,
  Avatar,
  Tooltip,
  Modal,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Http from "./../../api/http";
import { withSuccess } from "antd/lib/modal/confirm";

const http = new Http();
const { confirm, success } = Modal;
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

  reloadCalendar() {
    this.props.reloadCalendar();
  }

  showConfirmDelete(id) {
    confirm({
      title: "Deseas cancelar la reunion ?",
      icon: <ExclamationCircleOutlined />,
      content:
        "Esta reuniòn sera cancelada y quitado de la vista de los usuarios",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        this.deleteMetting(id);
      },
    });
  }

  deleteMetting = async (id) => {
    console.log("delete ", id);
    const response = await http.delete(`calendar/metting?id=${id}`);
    console.log(response);
    if (response.result == "erased") {
      success({
        content: "Se ha cancelado la reunión",
      });
      this.reloadCalendar();
      this.props.closeDetail();
    }
  };

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
                        <Button
                          type="danger"
                          value={item.idcalendar}
                          onClick={() =>
                            this.showConfirmDelete(item.idcalendar)
                          }
                        >
                          Cancelar Reunión
                        </Button>
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
