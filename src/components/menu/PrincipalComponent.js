import React from 'react';
import './index.css'
import {Layout, Menu} from 'antd';
import {UserOutlined, VideoCameraOutlined, UploadOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';

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
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
              <div className="logo" />
              <Menu theme="dark" mode="inline">
                <Menu.Item key="1">
                  <UserOutlined />
                  <Link to="/events"><span>Eventos</span></Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <VideoCameraOutlined />
                  <Link to="/services"><span>Servicios</span></Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <UploadOutlined />
                  <Link to="/tracing"><span>Seguimiento</span></Link>
                </Menu.Item>
              </Menu>
            </Sider>
        );
      }
    }
export default PrincipalComponent;
