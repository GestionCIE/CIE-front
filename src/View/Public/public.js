import React from "react";
import { Layout, Row, Col } from "antd";
import "antd/dist/antd.css";
import "./public.css";
import ContentPublic from "./switchContent";

import Nav from "./nav";

const { Header, Content, Footer } = Layout;

export class Public extends React.Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <Nav />
        </Header>
        <Content className="content">
          <ContentPublic />
        </Content>
        <Footer className="footer">
          <Row>
            <Col span={24}>
              <h1>Copyrigth</h1>
            </Col>
          </Row>
        </Footer>
      </Layout>
    );
  }
}
