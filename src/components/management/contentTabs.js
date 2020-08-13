import React from "react";
import { Table } from "antd";

class ContentTabs extends React.Component {
  constructor() {
    super();
    this.showDetailRow = this.showDetailRow.bind(this);
  }

  showDetailRow = (recoder) => {
    this.props.showDetail(recoder);
  };

  componentDidMount() {
    console.log("ContentTabs datasource", this.props.dataSource);
  }

  render() {
    return (
      <Table
        columns={this.props.columns}
        pagination={false}
        dataSource={this.props.dataSource}
        onRow={(recoder) => {
          return {
            onClick: this.showDetailRow.bind(this, recoder),
          };
        }}
      />
    );
  }
}

export default ContentTabs;
