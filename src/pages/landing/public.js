import React from "react";
import { Layout, Row, Col } from "antd";
import "antd/dist/antd.css";
import "./public.css";
import ContentPublic from "./switchContent";
import Menu from "./menu";

const { Header, Content, Footer } = Layout;

class Public extends React.Component {
  render() {
    return (
      <Layout>
        <Header className="Menu_fixed">
          <Menu />
        </Header>
        <Content className="content">
          <ContentPublic />
        </Content>
      </Layout>
    );
  }
}

export default Public;
