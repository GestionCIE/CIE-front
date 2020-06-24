import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./page.css";

import PrincipalComponent from "../components/menu/PrincipalComponent";
import HeaderComponent from "../components/Header/Header";
import ContentPrivate from "./admin/index";

const { Content } = Layout;

class Home extends React.Component {
  state = {
    path: "",
    collapsed: true,
    img:""
  };

  onAlert = () => {
    this.setState({ collapsed: !this.state.collapsed });
    console.log(this.state.collapsed);
  };

  handleImage = (img64bits) =>{
    this.setState({img: img64bits});
  }

  render() {
    console.log(this.props);
    return (
      <Layout>
        <PrincipalComponent
          img={this.state.img}
          collapsed={this.state.collapsed}
          onClick={this.onAlert}
        />
        <Layout className="site-layout">
          <HeaderComponent onClick={this.onAlert} history={this.props.history} />
          <Content>
            <ContentPrivate handleImage={this.handleImage} ></ContentPrivate>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
