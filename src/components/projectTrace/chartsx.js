import React from "react";
import { Bar, Line, Pie, HorizontalBar } from "react-chartjs-2";
import { Row, Col, Card } from "antd";
import Http from "../../api/http";

const http = new Http();

class stateOfActivivities extends React.Component {
  state = {
    data: [],
    labels: [],
    idProject: 0,
    report: 0,
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

  async getProjectsByPhases() {
    const response = await http.get("tracing/stateByPhase");
    this.setState({
      data: response.data,
      labels: response.labels,
    });
  }

  componentDidMount() {
    this.getTypeReport();
  }

  getTypeReport() {
    const { report } = this.props;
    if (report == "1") {
      this.getAmountActivities();
    } else if (report == "2") {
      this.getAmountStateActivitities();
    } else if (report == "3") {
      this.getAmountRate();
    } else if (report == "5") {
      console.log("entre");
      this.getentrepreneursServed();
    } else if (report == "6") {
      this.getProjectsByPhases();
    } else if (report == "7") {
      this.getentrepreneursByProgram();
    }
  }

  componentDidUpdate() {
    if (this.props.report != this.state.report) {
      this.getTypeReport();
      this.setState({
        report: this.props.report,
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
          pointBorderWidth: 0.5,
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

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              precision: 0,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              precision: 0,
            },
          },
        ],
      },
    };
    return (
      <Row>
        <Col span={12}>
          <Card className="Card_Chart">
            <HorizontalBar data={data} options={options} />
          </Card>
        </Col>
        <Col span={12}>
          <Card className="Card_Chart">
            <Line data={data} options={options} />
          </Card>
        </Col>
        <Col span={12}>
          <Card className="Card_Chart">
            <Pie data={data} />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default stateOfActivivities;
