import React from "react";
import { Row, Col, Select, Table, Checkbox, Tabs, Modal } from "antd";

import TracingComponent from "./tracingComponent";
import "./assistance.css";
import Charts from "./charts";
import assistantImg from "../../assets/assistant.svg";
import { AttendanceStatistics } from "./../commons/eventStatistics";

import Http from "./../../api/http";

const http = new Http();
const { Option } = Select;
const { TabPane } = Tabs;
const { success, error } = Modal;

class Assistance extends React.Component {
  state = {
    events: [],
    attendance: [],
    value: false,
    idEvent: 0,
    eventName: "",
    change: false,
  };

  componentDidMount() {
    this.getAllEvents();
  }

  getAllEvents = async () => {
    const response = await http.get("tracing/getEvents");
    this.setState({ events: response.result });
  };

  getAssistenceByEvent = async (value) => {
    console.log(value);
    // let idEvent = 0;
    // let eventName = '';

    // if((value.split('-')).length > 0) {
    //     idEvent = value.split('-')[0];
    //     eventName = value.split('-')[1];
    // }else {
    //     idEvent = value;
    // }

    const response = await http.get(`tracing/getAttendance?id=${value}`);
    console.log(response);
    this.setState({ attendance: response.result, idEvent: value });
  };

  addAttendance = async (e, recoder) => {
    console.log(recoder);
    const data = {
      idattendance: recoder.idattendance,
      confirm: e.target.checked,
    };
    const response = await http.post(`tracing/updateAttendance`, data);
    console.log(response);
    if (response.result == "edited") {
      this.getAssistenceByEvent(recoder.idEvent);
      this.setChange(true);
      const message = `se ${
        e.target.checked == true
          ? "tomo la asistencia"
          : "le quito la asistencia"
      } correctamente`;
      success({ content: message + " " + recoder.idEvent });
    } else {
      error({ content: "no se ha podido tomar la asistencia" });
    }
  };

  setChange = (value) => {
    this.setState({
      change: value,
    });
  };

  render() {
    const columns = [
      {
        title: "Asistencia",
        dataIndex: "attended",
        render: (text, recoder) => (
          <Checkbox
            checked={recoder.confirmedAssistance == 1 ? true : false}
            onChange={(e) => {
              this.addAttendance(e, recoder);
            }}
          >
            {" "}
            Asistio{" "}
          </Checkbox>
        ),
      },
      {
        title: "Nombre del invitado",
        dataIndex: "fullName",
      },
      {
        title: "Relacción con la universidad",
        dataIndex: "relationshipUniversity",
      },
    ];

    return (
      <Row>
        <Col span={24}>
          <h6>Trazabilidad de eventos</h6>
        </Col>
        <Col span={24}>
          <Tabs>
            <TabPane tab="Asistencia a eventos" key="1">
              <Row>
                <Col span={24}>
                  <h6>Lista de asistencia a los eventos</h6>
                </Col>
                <Col span={24}>
                  <Select
                    className="Select_Assistance"
                    defaultValue="Seleccionar un evento"
                    onChange={this.getAssistenceByEvent}
                  >
                    {this.state.events.map((e) => {
                      return (
                        <Option value={e.idEvents}> {e.eventName} </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col span={24}>
                  <Row gutter={6}>
                    <Col span={15}>
                      {this.state.attendance.length > 0 ? (
                        <Table
                          size="small"
                          columns={columns}
                          dataSource={this.state.attendance}
                        ></Table>
                      ) : (
                        <img src={assistantImg} className="Img_Assistant" />
                      )}
                    </Col>
                    <Col offset={1} span={7}>
                      <AttendanceStatistics
                        type={1}
                        idEvent={this.state.idEvent}
                        change={this.state.change}
                        setChange={this.setChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Seguimiento" key="2">
              <TracingComponent />
            </TabPane>
            <TabPane tab="Reportes" key="3">
              <Charts />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

export default Assistance;
