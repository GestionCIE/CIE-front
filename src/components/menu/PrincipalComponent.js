import React from 'react';
import './index.css'
import {Layout, Menu} from 'antd';
import {UserOutlined, VideoCameraOutlined, UploadOutlined} from "@ant-design/icons";
import { Link, Switch, Route} from 'react-router-dom';
import EventComponent from './../events/eventComponent';
const {Sider} = Layout;

class PrincipalComponent  extends React.Component{
      state = {
        collapsed: false,
      };

      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
      render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{height:'100vh'}}>
              <div className="logo" />
              <Menu theme="dark" mode="inline">
                <Menu.Item key="1">
                  <UserOutlined />
                  <Link to="/admin/events"><span>Eventos</span></Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <VideoCameraOutlined />
                  <Link to="/admin/services"><span>Servicios</span></Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <UploadOutlined />
                  <Link to="/admin/tracing"><span>Seguimiento</span></Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <UploadOutlined />
                  <Link to="/admin/config"><span>Configuracion</span></Link>
                </Menu.Item>
              </Menu>
            </Sider>
        );
      }
    }
export default PrincipalComponent;
