import React from "react";
import "./header.css";

import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, BellOutlined, SettingOutlined } from "@ant-design/icons";
import Notification from './nofication';
const { Header } = Layout;

class HeaderComponent extends React.Component {

  constructor(props){
    super(props);
  }
  state = {
    collapsed: true,
    openbell: 'none'
  };

  onClick = () => {
    this.props.onClick();
  };

  settings = ()=> {
    this.props.history.push('/admin/profile');
  }
  
  bell = () =>{
    this.state.openbell == 'none' ?  this.setState({openbell: 'block'}) 
    : this.setState({openbell: 'none'});
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
          <div className="Items">
            <div className="NavRight__Notif">
              <BellOutlined className="icon _BellOutlined" onClick={this.bell}style={{ fontSize: "20px" }} />
            </div>
            <div className="NavRight__Settings">
              <SettingOutlined className="icon"  onClick={this.settings} style={{ fontSize: "20px" }} />
            </div>
          </div>
        </div>
       
        <Notification showbell={this.state.openbell}></Notification>
      </Header>
       
    );
  }
}

export default HeaderComponent;
