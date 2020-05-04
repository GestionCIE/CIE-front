import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import PrincipalComponent from '../../components/menu/PrincipalComponent';
import Header from '../../components/Header/Header';
import './Home.css';
import ContentPrivate from '../Content/index';
import {useLocation} from 'react-router-dom';
const {Content} = Layout;
class Home extends React.Component {

    state={
        path: ''
    }
    componentDidUpdate(){
        console.log(this.props.location.pathname);
        const path = this.props.location.pathname;
        if(this.state.path != path)
            this.setState({path: this.props.location.pathname});


    }

    render() {
        return (
            <Layout>  
                <PrincipalComponent/>
                <Layout className="site-layout">
                    <Header path={this.state.path}/>
                    <Content>
                    <ContentPrivate></ContentPrivate>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Home;
