import React from "react";
import "./header.css";

import { Layout, Button, Badge } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { SocketContext } from "../../routers/context";
import Notification from "./nofication";

const { Header } = Layout;

class HeaderComponent extends React.Component {
  static contextType = SocketContext;

  constructor(props) {
    super(props);
  }

  state = {
    collapsed: false,
    openbell: "none",
    amountNotifications: 0,
  };

  onClick = () => {
    this.props.onClick();
  };

  settings = () => {
    this.props.history.push("/admin/profile");
  };

  bell = () => {
    this.state.openbell == "none"
      ? this.setState({ openbell: "block" })
      : this.setState({ openbell: "none" });
  };

  amountNotifications() {
    this.context.socket.emit("/amountNotifications", {
      id: localStorage.getItem("idUser"),
    });
    this.context.socket.on("/get/amountNotifications", (data) => {
      this.setState({
        amountNotifications: data[0].amount,
      });
    });
  }

  componentDidMount() {
    this.amountNotifications();
  }

  render() {
    return (
      <SocketContext.Consumer>
        {(context) => (
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="Navbar">
              <div className="Menu-button">
                <Button type="primary" onClick={this.onClick} style={{}}>
                  {React.createElement(
                    this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
                  )}
                </Button>
              </div>
              <div className="Items">
                <div className="NavRight__Notif">
                  <BellOutlined
                    className="icon _BellOutlined"
                    onClick={this.bell}
                    style={{ fontSize: "20px" }}
                  />
                  <Badge
                    count={this.state.amountNotifications}
                    style={{ backgroundColor: "#52c41a" }}
                  />
                </div>
                <div className="NavRight__Settings">
                  <SettingOutlined
                    className="icon"
                    onClick={this.settings}
                    style={{ fontSize: "20px" }}
                  />
                </div>
              </div>
            </div>

            <Notification showbell={this.state.openbell} />
          </Header>
        )}
      </SocketContext.Consumer>
    );
  }
}

export default HeaderComponent;
