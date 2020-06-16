import React from "react";
import "./Header.css";

import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import HeaderManagement, { NavRight } from "./HeaderManagement";
import Notification from './nofication';
const { Header } = Layout;

class HeaderComponent extends React.Component {
  state = {
    collapsed: true,
    openbell: false
  };

  onOpenBell = () => {
    this.setState({openbell: true});
  }

  onClick = () => {
    this.props.onClick();
  };


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
          <NavRight />
        </div>
       
        <Notification></Notification>
      </Header>
       
    );
  }
}

export default HeaderComponent;
