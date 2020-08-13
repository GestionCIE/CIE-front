import React from "react";
import {
  Drawer,
  Space,
  InputNumber,
  Modal,
  Row,
  Col,
  Avatar,
  Tooltip,
  Rate,
  Progress,
  Button,
  Select,
} from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Comments from "./comments";
import Http from "./../../api/http";
import { getNameResource, is } from "./../../utils/utils";
import { SocketContext } from "./../../routers/context";

const http = new Http();
const { success, confirm } = Modal;
class detailActivity extends React.Component {
  static contextType = SocketContext;

  state = {
    visibleDrawer: false,
    activity: [],
    commentary: "",
    idActivity: 0,
    description: "",
    resource: "",
    executionWeek: "",
    rate: 1,
    percentaje: 0,
    state: "",
    prefix: 10,
  };

  async getActivity() {
    const response = await http.get(
      `project/getActivity?id=${this.props.detailtActivity.id}`
    );
    const data = response.result[0];

    this.setState({
      description: data.description,
      resource: data.resources,
      executionWeek: data.executionWeek,
      percentaje: data.percentaje == undefined ? 0 : data.percentaje,
      state: data.state,
    });

    console.log("response >>>", response);
  }

  componentDidUpdate() {
    if (this.props.detailtActivity.id != this.state.idActivity) {
      console.log(this.props.detailtActivity);
      this.getActivity();
      this.setState({
        idActivity: this.props.detailtActivity.id,
      });
    }
  }

  componentDidMount() {
    this.getActivity();
  }

  getParticipants() {
    const result = [];
    const participants = this.props.detailtActivity.profile;
    for (let i = 0; i < participants.length; i++) {
      result.push(participants[i].responsable);
    }

    return result;
  }

  deleteNotification() {
    const activity = this.props.detailtActivity.nameActivity;
    const noti = {
      from: localStorage.getItem("username"),
      message: `La actividad ${activity} ha sido eliminada del proyecto`,
      to: this.getParticipants(),
      image: localStorage.getItem("imageUrl"),
    };

    this.context.socket.emit("/deleteActivity", noti);
  }

  onChangeRate = (number) => {
    console.log("rate >>> ", number);

    this.addRate(number);
  };

  async addRate(number) {
    const data = {
      rate: number,
      id: this.props.detailtActivity.id,
    };
    const response = await http.post("project/updateRate", data);
    this.setState({
      rate: number,
    });
    console.log("rate update >>>", response);
  }

  increase = () => {
    let percentaje = this.state.percentaje + this.state.prefix;
    if (percentaje > 100) {
      percentaje = 100;
    }

    this.updatePercentaje({ id: this.props.detailtActivity.id, percentaje });
    console.log(this.props.idProject, " ", this.props.phase);
    this.props.reloadActivities(this.props.idProject, this.props.phase, 1);
    this.setState({ percentaje });
  };

  decline = () => {
    let percentaje = this.state.percentaje - this.state.prefix;
    if (percentaje < 0) {
      percentaje = 0;
    }

    this.updatePercentaje({ id: this.props.detailtActivity.id, percentaje });
    console.log(this.props.idProject, " ", this.props.phase);
    this.props.reloadActivities(this.props.idProject, this.props.phase, 1);
    this.setState({ percentaje });
  };

  async updatePercentaje(data) {
    const response = await http.post("project/percentaje", data);
    console.log(response);
  }

  getStates = (value) => {
    const state = value[0];
    if (state != undefined) {
      this.updateState(state);
      this.setState({ state: state });
    }
  };

  async updateState(value) {
    const response = await http.post("project/state", {
      id: this.props.detailtActivity.id,
      state: value[0],
    });
    this.getPercentaje();
    this.props.reloadActivities(this.props.idProject, this.props.phase, 1);
    console.log(response);
  }

  async deleteActivity() {
    const response = await http.post("project/deleteActivity", {
      id: this.props.detailtActivity.id,
    });
    if (response.result == "erased") {
      success({
        content: "Se ha borrado la actividad correctamente",
      });

      this.props.reloadActivities(this.props.idProject, this.props.phase, 1);
      this.props.closeDrawer();
      this.deleteNotification();
    }
  }

  delete = () => {
    confirm({
      title: "Deseas eliminar la actividad ?",
      icon: <ExclamationCircleOutlined />,
      content: "Esta actividad se eliminara del proyecto",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        this.deleteActivity();
      },
    });
  };

  getPercentaje() {
    const state = this.state.state;
    const percentaje = this.state.percentaje;

    if (state == "3") {
      return (
        <Progress
          width={40}
          className="Progress"
          type="circle"
          status="exception"
          percent={percentaje != undefined ? percentaje : 0}
        />
      );
    } else {
      if (percentaje == 100) {
        return (
          <Progress
            width={40}
            className="Progress"
            type="circle"
            status="success"
            percent={percentaje != undefined ? percentaje : 0}
          />
        );
      } else {
        return (
          <Progress
            width={40}
            className="Progress"
            type="circle"
            percent={percentaje != undefined ? percentaje : 0}
          />
        );
      }
    }
  }

  onChangePrefix = (value) => {
    this.setState({ prefix: value });
  };

  showExecutionWeek() {
    const dateInit = this.state.executionWeek.split(" ")[0];
    const dateEnd = this.state.executionWeek.split(" ")[1];

    return (
      <p>
        <Space size={8}>
          <span>Fecha de inicio : {dateInit}</span>
          <span>Fecha de Fin: {dateEnd}</span>
        </Space>
      </p>
    );
  }

  render() {
    return (
      <Drawer
        width="40%"
        title="Detalle de la actividad"
        placement="right"
        closable={false}
        onClose={this.props.closeDrawer}
        visible={this.props.visibleDrawer}
      >
        <Row>
          <Col span={24}>
            <div className="Drawer_Content">
              <div className="Drawer_Content_Div">
                <div>
                  <h6> Nombre: </h6>{" "}
                  <p> {this.props.detailtActivity.nameActivity}</p>
                </div>
                {is("adviser") == true ? (
                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={this.delete}
                  >
                    Eliminar Actividad
                  </Button>
                ) : null}
              </div>
              <div>
                <h6>Description: </h6>
                <p>{this.state.description}</p>
              </div>
              <div>
                <h6>Integrantes: </h6>
                {this.props.detailtActivity.profile.map((e) => {
                  return (
                    <Tooltip placement="top" title={e.responsable}>
                      <Avatar>{e.nameshort}</Avatar>
                    </Tooltip>
                  );
                })}
              </div>
              <div>
                <h6>Estado de la actividad</h6>
                {this.props.getState(this.state.state)}
                <Space size={8}>
                  {this.getPercentaje()}
                  <Button.Group>
                    <Button onClick={this.decline} icon={<MinusOutlined />} />
                    <Button onClick={this.increase} icon={<PlusOutlined />} />
                  </Button.Group>

                  <Select
                    mode="multiple"
                    style={{ minWidth: "200px" }}
                    placeholder="Progreso"
                    onChange={this.getStates}
                  >
                    {this.props.getOptionState()}
                  </Select>
                </Space>
                <p>Ajuste del porcentaje</p>
                <InputNumber
                  size="small"
                  min={1}
                  max={100}
                  defaultValue={this.state.prefix}
                  onChange={this.onChangePrefix}
                />
              </div>
              <div>
                <h6>Semana de ejecucion:</h6>
                <br />
                {this.showExecutionWeek()}
              </div>
              <h6>Recursos: </h6>
              <a href={this.state.resource} download>
                {" "}
                {getNameResource(this.state.resource)}
              </a>

              <div>
                <h6>Calificar Actividad</h6>
                <br />
                <Rate
                  value={this.state.rate}
                  count={4}
                  onChange={this.onChangeRate}
                />
              </div>

              <div>
                <Comments idActivity={this.props.detailtActivity.id} />
              </div>
            </div>
          </Col>
        </Row>
      </Drawer>
    );
  }
}

export default detailActivity;
