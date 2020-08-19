import React from "react";
import {
  Layout,
  Row,
  Col,
  Table,
  Switch,
  Menu,
  Checkbox,
  Modal,
  message,
} from "antd";
import { ScheduleOutlined } from "@ant-design/icons";
import Http from "../../api/http";

const { SubMenu } = Menu;
const { Content } = Layout;
const { success, error } = Modal;
const http = new Http();

class TracingComponent extends React.Component {
  state = {
    tracing: [],
    loading: false,
    data: [],
  };

  async reloadTable(id) {
    const tracing = [];

    const response = await http.get(`tracing/getAttendance?id=${id}`);
    for (let i = 0; i < response.result.length; i++) {
      tracing.push(response.result[i]);
    }
    this.setState({ tracing });
  }

  async getEvents() {
    const { data } = this.state;
    const response = await http.get("tracing/getEvents");
    for (let i = 0; i < response.result.length; i++) {
      data.push(response.result[i]);
    }
    this.setState({ data });
  }

  componentDidMount() {
    this.getEvents();
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? "dark" : "light",
    });
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
  };

  async handleTracing(recoder, e) {
    console.log(e);
    const jsonTracing = {
      attended: e.target.checked,
      idattendance: recoder.idattendance,
    };

    const response = await http.post("tracing/updateAttended", jsonTracing);
    if (response.result === "edited") {
      this.reloadTable(recoder.idEvent);
      const message =
        e.target.checked == true
          ? "Se ha confirmado la asistencia"
          : "Se desconfirma la asistencia";
      success({ content: message });
    } else {
      error({
        content:
          "Ha habido un error en la confirmacion o desconfirmacion de la asistencia",
      });
    }
  }

  render() {
    const columns = [
      {
        title: "Confirmado",
        dataIndex: "attended",
        render: (text, recoder) => (
          <Checkbox
            checked={recoder.attended == 1}
            onChange={this.handleTracing.bind(this, recoder)}
          />
        ),
      },
      {
        title: "nombre",
        dataIndex: "fullName",
      },
      {
        title: "Relacion con la Universidad",
        dataIndex: "relationshipUniversity",
      },
      {
        title: "email",
        dataIndex: "email",
      },
      {
        title: "telefono",
        dataIndex: "phoneNumber",
      },
    ];
    return (
      <Content>
        <Row>
          <Col span={7}>
            <Switch
              checked={this.state.theme === "dark"}
              onChange={this.changeTheme}
              checkedChildren="Oscuro"
              unCheckedChildren="Claro"
            />
            <br />
            <br />
            <Menu
              theme={this.state.theme}
              onClick={this.handleClick}
              style={{ width: 256 }}
              defaultOpenKeys={["sub1"]}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              <SubMenu
                key="sub1"
                title={(
                  <span>
                    <ScheduleOutlined />
                    <span>Eventos</span>
                  </span>
                )}
              >
                {this.state.data.map((evento) => {
                  return (
                    <Menu.Item
                      key={evento.idEvents}
                      onClick={this.reloadTable.bind(this, evento.idEvents)}
                    >
                      {evento.eventName}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            </Menu>
          </Col>
          <Col span={16} push={1}>
            <Table columns={columns} dataSource={this.state.tracing} />
          </Col>
        </Row>
      </Content>
    );
  }
}

export default TracingComponent;
