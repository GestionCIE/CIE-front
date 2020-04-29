import React from 'react';
import {Carousel, Row, Col, Typography} from 'antd';
import Information from './information';
import './cie.css';


class Cie extends React.Component {

    render(){
        return(
            <Row>
                <Col span={24}>
                <Carousel autoplay className="carousel">
                    <div>
                        <img src="http://localhost:3000/cie.jpg" />
                    </div>
                    <div>
                        <img src="http://localhost:3000/cie.jpg" />
                    </div>
                    <div>
                        <img src="http://localhost:3000/cie.jpg"/>
                    </div>
                    <div>
                        <img src="http://localhost:3000/cie.jpg" />
                    </div>
                    <div>
                        <img src="http://localhost:3000/cie.jpg" />
                    </div>
                    <div>
                        <img src="http://localhost:3000/cie.jpg" />
                    </div>
                </Carousel>
                </Col>
                <Col span={24}>
                    <Information></Information>
                </Col>
            </Row>
        );
    }
}

export default Cie;
