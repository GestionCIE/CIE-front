import React from "react";
import "./index.css";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Profile from "./profile";

const { Sider } = Layout;
class PrincipalComponent extends React.Component {
  state = {
    collapsed: this.props.collapsed,
    style: { display: "none" },
  };
  exit = () => {
    alert(localStorage.getItem("TOKEN"));
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.collapsed !== nextProps.collapsed) {
      this.setState({
        collapsed: nextProps.collapsed,
      });
      if (this.state.collapsed === false) {
        this.setState({ style: { display: "none" } });
      } else {
        this.setState({ style: { display: "block", height: "100vh" } });
      }
    }
  }
  render() {
    return (
      <Sider className="Principal_Sider"
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        style={this.state.style}
      
      >
        <div className="logo">
          <Profile className="profile" />
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <UserOutlined />
            <Link to="/admin/events">
              <span>Eventos</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <VideoCameraOutlined />
            <Link to="/admin/services">
              <span>Servicios</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <UploadOutlined />
            <Link to="/admin/tracing">
              <span>Seguimiento</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <UploadOutlined />
            <Link to="/admin/config">
              <span>Configuracion</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <UploadOutlined />
            <Link to="/admin/management">
              <span>Gestion de proyectos</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <UploadOutlined />
            <Link to="/admin/proyect">
              <span>Crear Proyecto</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <ArrowLeftOutlined />
            <Link to="/inicio" onClick={this.exit}>
              <span>Salir</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
export default PrincipalComponent;
