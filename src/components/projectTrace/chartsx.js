import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Row, Col } from "antd";
import Http from "../../api/http";

const http = new Http();

class stateOfActivivities extends React.Component {
  state = {
    data: [],
    labels: [],
    idProject: 0,
    typeGraph: 0,
  };

  async getAmountActivities() {
    const response = await http.get(
      `project/getAmountActivities/graphs?idProject=${this.props.idProject}`
    );
    console.log("response >>> ", response);
    this.setState({
      data: response.data,
      labels: response.labels,
    });
  }

  async getAmountStateActivitities() {
    const response = await http.get(
      `project/getAmountStateActivities?idProject=${this.props.idProject}`
    );
    this.setState({
      data: response.data,
      labels: response.labels,
    });
  }

  async getAmountRate() {
    const response = await http.get(
      `project/getAmountRate?idProject=${this.props.idProject}`
    );
    this.setState({
      data: response.data,
      labels: response.labels,
    });
  }

  async getentrepreneursServed() {
    const response = await http.get(`tracing/entrepreneursServed`);
    this.setState({
      data: response.data,
      labels: response.labels,
    });
  }

  async getentrepreneursByProgram() {
    const response = await http.get("tracing/entrepreByProgram");
    this.setState({
      data: response.data,
      labels: response.labels,
    });
  }

  componentDidMount() {
    this.getTypeGraph();
  }

  getTypeGraph() {
    const {typeGraph} = this.props;
    if (typeGraph == "1") {
      this.getAmountActivities();
    } else if (typeGraph == "2") {
      this.getAmountStateActivitities();
    } else if (typeGraph == "3") {
      this.getAmountRate();
    } else if (typeGraph == "5") {
      console.log("entre");
      this.getentrepreneursServed();
    } else if (typeGraph == "7") {
      this.getentrepreneursByProgram();
    }
  }

  componentDidUpdate() {
    if (this.props.typeGraph != this.state.typeGraph) {
      this.getTypeGraph();
      this.setState({
        typeGraph: this.props.typeGraph,
      });
    }
  }

  render() {
    const data = {
      labels: this.state.labels,
      datasets: [
        {
          label: this.props.titleGraph,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.data,
        },
      ],
    };
    return (
      <Row>
        <Col span={12}>
          <Bar data={data} />
        </Col>
        <Col span={12}>
          <Line data={data} />
        </Col>
        <Col span={12}>
          <Pie data={data} />
        </Col>
      </Row>
    );
  }
}

export default stateOfActivivities;
