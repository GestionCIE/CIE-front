import React from "react";
import { Switch, Route } from "react-router-dom";

import { Layout } from "antd";
import EventComponent from "../../components/events/eventComponent";
import ServiceComponent from "../../components/services/serviceComponent";
import Configuration from "../../components/configuration/configuration";
import ProjectManagement from "../../components/management/management";
import Project from "../../components/proyect/project";
import Assistance from "../../components/assistance/assistance";
import GeneralComponent from "../../components/general/general";
import ProfileComponent from "../../components/profile/profile";
import ProjectTrace from "../../components/projectTrace/projectTrace";
import Calendar from "./../../components/calendar/calendar";
import { SocketContext } from "../../routers/context";
import Http from "../../api/http";

const http = new Http();
const { Content } = Layout;

class ContentPrivate extends React.Component {
  static contextType = SocketContext;

  state = {
    modules: [],
  };

  async getModulesByRole() {
    const response = await http.get(
      `config/getModulesByRole?role=${localStorage.getItem("role")}`
    );
    this.setState({ modules: response.result });
  }

  componentDidMount() {
    this.getModulesByRole();
    console.log(this.context);
    this.registerUser();
  }

  registerUser() {
    const { socket } = this.context;
    const data = {
      username: localStorage.getItem("username"),
    };
    socket.emit("/registerUser", data);
  }

  render() {
    return (
      <Content
        className="site-layout-background  Page_Content"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: "85vh",
          maxHeight: "100vh",
        }}
      >
        <SocketContext.Consumer>
          {(context) => (
            <Switch>
              <Route
                exact
                path="/dashboard/events"
                component={EventComponent}
              />
              <Route
                exact
                path="/dashboard/services"
                component={ServiceComponent}
              />
              <Route exact path="/dashboard/config" component={Configuration} />
              <Route
                exact
                path="/dashboard/management"
                render={() => (
                  <ProjectManagement idProject={this.props.idProject} />
                )}
              />
              <Route exact path="/dashboard/proyect" component={Project} />
              <Route
                exact
                path="/dashboard/assistance"
                component={Assistance}
              />
              <Route
                exact
                path="/dashboard/profile"
                render={() => (
                  <ProfileComponent handle={this.props.handleImage} />
                )}
              />
              <Route
                exact
                path="/dashboard/trazproject"
                component={ProjectTrace}
              />
              <Route exact path="/dashboard/calendar" component={Calendar} />
              <Route exact path="/dashboard" component={GeneralComponent} />
            </Switch>
          )}
        </SocketContext.Consumer>
      </Content>
    );
  }
}

export default ContentPrivate;
