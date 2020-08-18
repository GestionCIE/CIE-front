import React from "react";
import { Row, Col, Timeline, Card, Statistic, Button } from "antd";
import "./general.css";
import Http from "../../api/http";

const http = new Http();

class GeneralComponent extends React.Component {
  state = {
    eventStatistics: [],
    lastActivitySystem: [],
  };

  getUpcomingEvents = async () => {
    const response = await http.get("event/getEventStatistics");
    console.log(response);
    this.setState({
      eventStatistics: response.result,
    });
  };

  getLastActivitySystem = async () => {
    const response = await http.get(
      `event/getEventStatistics?id=${localStorage.getItem("idUser")}`
    );
    this.setState({ lastActivitySystem: response.result });
  };

  componentDidMount() {
    this.getUpcomingEvents();
  }

  render() {
    return (
      <Row>
        <Col span={12}>
          <h6>Ultimas actividades realizadas</h6>
          <br />
          <Timeline>
            <Timeline.Item color="green">
              Create a services site 2015-09-01
            </Timeline.Item>
            <Timeline.Item color="green">
              Create a services site 2015-09-01
            </Timeline.Item>
            <Timeline.Item color="red">
              <p>Solve initial network problems 1</p>
              <p>Solve initial network problems 2</p>
              <p>Solve initial network problems 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item />
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
            {this.state.lastActivitySystem.map((data) => {
              return (
                <Timeline.Item color="green">
                  <p>
                    {data.activity}${data.date}-{data.hour}
                  </p>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <h6>Cantidad inscripciones a los proximos eventos</h6>
              <br />
            </Col>
            {this.state.eventStatistics.map((data, index) => {
              return (
                <Col span={24} key={index}>
                  <Card className="General_Card">
                    <Statistic
                      title={data.eventName}
                      value={data.numberRegistered}
                    />
                  </Card>
                  <br />
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col span={24}>
          <h6> Reuniones donde has sido invitado</h6>
          <div className="General_Meets">
            <Card className="General_Card_Meets">
              <Row>
                <Col span={24}>
                  <p>Planeacion de nuevos eventos</p>
                  <p>Fecha: 19/05/2020</p>
                  <span>Hora de inicio: 10:30 am</span>

                  <span>Hora de Fin: 10:30 am</span>
                  <br />
                </Col>
                <Col span={24}>
                  <div className="General_Card_Meets_Buttons">
                    <Button className="Card_Meets_Button" type="default">
                      Aceptar
                    </Button>
                    <Button type="danger">Cancelar</Button>
                  </div>
                </Col>
              </Row>
            </Card>

            <Card className="General_Card_Meets">
              <Statistic title="Emprendimiento Dinamico" value={112893} />
            </Card>

            <Card className="General_Card_Meets">
              <Statistic title="Emprendimiento Dinamico" value={112893} />
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}

export default GeneralComponent;
