import React from "react";
import { Card } from "antd";

import { Chart } from "react-google-charts";
import Http from "../../api/http";

const http = new Http();

class GranttGraph extends React.Component {
  state = {
    data: [],
    phase: "",
  };

  async getData() {
    const f_data = [];
    let response = await http.get(
      `project/activities/gantt?id=${this.props.idProject}&phase=${this.props.phase}`
    );
    console.log(response);
    f_data.push(
      new Array(
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" }
      )
    );
    response = response.result;
    for (let i = 0; i < response.length; i++) {
      const startDate = this.parserDate(
        response[i].executionWeek.split(" ")[0]
      );
      const endDate = this.parserDate(response[i].executionWeek.split(" ")[1]);
      f_data.push(
        new Array(
          response[i].idActivities,
          response[i].nameActivity,
          response[i].resources,
          new Date(startDate.year, startDate.month, startDate.day),
          new Date(endDate.year, endDate.month, endDate.day),
          null,
          response[i].percentaje,
          null
        )
      );
    }

    this.setState({
      data: f_data,
    });
  }

  parserDate(date) {
    return {
      year: Number(date.split("-")[0]),
      month: Number(date.split("-")[1]),
      day: Number(date.split("-")[2]),
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    if (this.props.phase != this.state.phase) {
      this.setState({ phase: this.props.phase });
      this.getData();
    }
  }

  render() {
    return (
      <Card className="CardGrantt">
        <Chart
          style={{ marginTop: "30px" }}
          width="100%"
          height="400px"
          chartType="Gantt"
          loader={<div>Cargando Gantt</div>}
          data={this.state.data}
          options={{
            height: 400,
            gantt: {
              trackHeight: 30,
            },
          }}
        />
      </Card>
    );
  }
}

export default GranttGraph;
