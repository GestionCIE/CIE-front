import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import PrincipalComponent from '../../components/menu/PrincipalComponent';
import Header from '../../components/Header/Header';
import './Home.css';
import ContentPrivate from '../Content/index';

const {Content} = Layout;
class Home extends React.Component {
    render() {
        return (
            <Layout>  
                <PrincipalComponent/>
                <Layout className="site-layout">
                    <Header/>
                    <Content>
                    <ContentPrivate></ContentPrivate>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Home;
