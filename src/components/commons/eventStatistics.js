import React from "react";
import { Row, Col, Statistic } from "antd";
import Http from "../../api/http";
import statistics from "../../assets/statistics.svg";

const http = new Http();

class AttendanceStatistics extends React.Component {
  state = {
    statistics: "",
    idEvent: "",
  };

  componentDidMount() {
    this.getStatistics();
  }

  componentDidUpdate() {
    if (this.props.idEvent != this.state.idEvent) {
      console.log("entre");
      this.getStatistics();
      this.setState({
        idEvent: this.props.idEvent,
      });
    }

    if (this.props.change) {
      this.getStatistics();
      this.props.setChange(false);
    }
  }

  async getStatistics() {
    const response = await http.get(
      `tracing/Statistics?type=${this.props.type}&id=${this.props.idEvent}`
    );
    console.log("amount", response);
    this.setState({
      statistics: response.result[0].amount,
    });
  }

  render() {
    const styleImage = {
      width: "60%",
    };

    return (
      <Row>
        <Col span={24}>
          <h6>Evento</h6>
        </Col>
        <Col span={12}>
          <Statistic
            title={this.props.eventName}
            value={this.state.statistics}
          />
        </Col>
        <Col span={12}>
          <img style={styleImage} src={statistics} />
        </Col>
      </Row>
    );
  }
}

class TracingStatistics extends React.Component {
  render() {
    return <div />;
  }
}

export { AttendanceStatistics, TracingStatistics };
