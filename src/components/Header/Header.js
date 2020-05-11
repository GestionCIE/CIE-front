import React from "react";
import "./Header.css";

import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import HeaderManagement, { NavRight } from "./HeaderManagement";

const { Header } = Layout;

class HeaderComponent extends React.Component {
  state = {
    projects: [],
    collapsed: true,
  };

  onClick = () => {
    this.props.onClick();
  };

  getProjects() {
    let data = [];
    fetch("http://localhost:3005/project/getProjects")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        for (let i = 0; i < response.result.length; i++) {
          data.push(response.result[i]);
        }
        if (this.state.projects.length === 0) {
          this.setState({ projects: data });
        }
      });
  }

  optionsHeader() {
    let options = null;
    if (this.props.path === "/admin/management") {
      this.getProjects();
      return (
        <div className="NavContainer">
          <HeaderManagement handerProject = {this.setProject}
            projects={this.state.projects}
          />
        </div>
      );
    } else {
      options = <NavRight />;
    }

    return options;
  }
  setProject = (id)=>{
    console.log("entre");
    this.props.setProject(id);
  }

  componentDidMount() {
    this.setProject();
    this.optionsHeader();
  }

  render() {
    return (
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div className="Navbar">
          <div className="Menu-button">
            <Button type="primary" onClick={this.onClick} style={{}}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
              )}
            </Button>
          </div>

          {this.optionsHeader()}
        </div>
      </Header>
    );
  }
}

export default HeaderComponent;
