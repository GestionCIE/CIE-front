import React from "react";
import { Layout, Row, Col } from "antd";
import "antd/dist/antd.css";
import "./public.css";
import ContentPublic from "./switchContent";
import Inicio from '../Public/cie/cie';
import Nav from "./nav";

const { Header, Content, Footer } = Layout;

 class Public extends React.Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <Nav />
        
        </Header>
        <Content className="content">
        <ContentPublic />
          <Inicio/>
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

export default Public;