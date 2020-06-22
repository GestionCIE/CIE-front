import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  ArrowLeftOutlined,
  FileDoneOutlined, // service & events 
  CustomerServiceOutlined, // seguimiento
  SettingOutlined 

} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.css";
import Profile from "./profile";

const { Sider } = Layout;
class PrincipalComponent extends React.Component {
  state = {
    collapsed: this.props.collapsed,
    style: { display: "none" },
    modules: []
  };

  exit = () => {
    localStorage.removeItem("TOKEN");
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.collapsed !== nextProps.collapsed) {
      this.setState({
        collapsed: nextProps.collapsed,
      });
      if (this.state.collapsed === false) {
        this.setState({ style: { display: "none" } });
      } else {
        this.setState({ style: { display: "block", minHeight: '100vh', maxHeight: '120vh' } });
      }
    }
  }

  getModulesByRole(){
    fetch(`http://localhost:3005/config/getModulesByRole?role=${localStorage.getItem("role")}`)
    .then(res =>res.json())
    .then((response) =>{
      console.log(response);
      this.setState({modules: response.result});
    });
  }

  componentDidMount(){
    this.getModulesByRole();
  }

  addIcon(icon){
    let iconComponent = null;

    switch (icon) {
      case 'FileDoneOutlined':
        iconComponent =  <FileDoneOutlined/>
        break;
      case 'CustomerServiceOutlined':
        iconComponent =  <CustomerServiceOutlined/>
      break;
    
      case 'SettingOutlined':
        iconComponent = <SettingOutlined/>
        break;

      default:
        iconComponent = <UserOutlined/>
        break;
    }

    return iconComponent;
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
          <Profile className="profile" avatar={this.props.img}/>
        </div>
        <Menu theme="dark" mode="inline"defaultSelectedKeys={['1']}>
          {
            this.state.modules.map((e) =>{
              console.log("item", e)
              if(e.active)
                return <Menu.Item key={e.idSystemModules}>
                  {this.addIcon()}
                  <Link to={e.route}> <span>{e.nameModule}</span> </Link>
                </Menu.Item>
            })
          }
          <Menu.Item key="15">
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
