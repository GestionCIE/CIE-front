import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
  LogoutOutlined,
  CalendarOutlined,
  BarChartOutlined,
  NotificationOutlined,
  AppstoreAddOutlined,
  ReadOutlined,
  CreditCardOutlined,
  NodeExpandOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.css";
import Profile from "./profile";
import Http from "../../api/http";

const http = new Http();
const { Sider } = Layout;
class PrincipalComponent extends React.Component {
  state = {
    collapsed: this.props.collapsed,
    style: { display: "none" },
    modules: [],
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
        this.setState({
          style: { display: "block", minHeight: "100vh", maxHeight: "120vh" },
        });
      }
    }
  }

  async getModulesByRole() {
    const response = await http.get(
      `config/getModulesByRole?role=${localStorage.getItem("role")}`
    );
    this.setState({ modules: response.result });
  }

  componentDidMount() {
    this.getModulesByRole();
  }

  addIcon(idModule) {
    let iconComponent = null;

    switch (idModule) {
      case 1:
        iconComponent = <HomeOutlined />;
        break;
      case 2 || 9:
        iconComponent = <AppstoreAddOutlined />;
        break;

      case 3:
        iconComponent = <NotificationOutlined />;
        break;

      case 4:
        iconComponent = <CreditCardOutlined />;
        break;

      case 5 || 6 || 7 || 8:
        iconComponent = <CalendarOutlined />;
        break;

      case 10:
        iconComponent = <SettingOutlined />;
        break;

      case 11:
        iconComponent = <ReadOutlined />;
        break;

      case 13:
        iconComponent = <CarryOutOutlined />;
        break;

      case 14:
        iconComponent = <BarChartOutlined />;
        break;

      default:
        iconComponent = <UserOutlined />;
        break;
    }

    return iconComponent;
  }

  render() {
    return (
      <Sider
        className="Principal_Sider"
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        style={this.state.style}
      >
        <div className="logo">
          <Profile className="profile" avatar={this.props.img} />
        </div>
        <Menu
          className="Menu_Content"
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          {this.state.modules.map((e) => {
            console.log("item", e);
            if (e.active)
              return (
                <Menu.Item className="Menu_Item" key={e.idSystemModules}>
                  {this.addIcon(e.idSystemModules)}
                  <Link to={e.route}>
                    <span className="Menu_Item_Span">{e.nameModule}</span>
                  </Link>
                </Menu.Item>
              );
          })}
          <Menu.Item key="40" className="Menu_Item">
            <LogoutOutlined />
            <Link to="/inicio" onClick={this.exit}>
              <span className="Menu_Item_Span">Salir</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
export default PrincipalComponent;
