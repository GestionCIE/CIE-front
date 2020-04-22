import React from 'react';
import './Header.css';

import { Layout } from 'antd';
const { Header } = Layout;
class HeaderComponent extends React.Component {

    render() {
        return (
            <Header className="site-layout-background" style={{ padding: 0 }}>
            </Header>
        )
    }
}

export default HeaderComponent;
