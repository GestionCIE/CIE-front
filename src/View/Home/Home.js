import React from "react";
import "antd/dist/antd.css";
import { Layout /* , Button */ } from "antd";
/* import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"; */
import PrincipalComponent from "../../components/menu/PrincipalComponent";
import HeaderComponent from "../../components/Header/Header";
import "./Home.css";
import ContentPrivate from "../Content/index";
/* import { useLocation } from "react-router-dom"; */
const { Content } = Layout;
class Home extends React.Component {
  state = {
    path: "",
    collapsed: true,
  };

  onAlert = () => {
    this.setState({ collapsed: !this.state.collapsed });
    console.log(this.state.collapsed);
  };

  componentDidMount() {
    console.log(this.props.location.pathname);
    const path = this.props.location.pathname;
    if (this.state.path !== path)
      this.setState({ path: this.props.location.pathname });
  }

  render() {
    return (
      <Layout>
        <PrincipalComponent
          collapsed={this.state.collapsed}
          onClick={this.onAlert}
        />
        <Layout className="site-layout">
          <HeaderComponent onClick={this.onAlert} path={this.state.path} />
          <Content>
            <ContentPrivate></ContentPrivate>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
