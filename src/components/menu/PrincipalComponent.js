import React from 'react';
import 'antd/dist/antd.css';
import './index.css'
import {Layout, Menu} from 'antd';
import {MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';


const {Sider, Header} = Layout;

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
          <Layout>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                })}
              </Header>
            </Layout>
          </Layout>
        );
      }
    }
export default PrincipalComponent;