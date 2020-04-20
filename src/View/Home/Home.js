import React from 'react';
import PrincipalComponent from '../../components/menu/PrincipalComponent';
import Header from '../../components/Header/Header';
import Content from '../Content';
import './Home.css';

class Home extends React.Component {
    render() {
        return (
            <div className="d-flex">
                <div>
                    <PrincipalComponent/>
                </div>
                <div className={"wrapper"}>
                    <Header/>
                    <div className='mt-5'>
                        <Content/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
