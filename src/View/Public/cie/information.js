import React from 'react';
import { Row, Col, Typography, Card, Layout} from 'antd';

const {Title} = Typography;
const {Meta} = Card;
const {Content} = Layout;

class Information extends React.Component{

    render(){
        return(
           <Content >
               
                <Title level={3} > 
                    <h3 className="info-h3"  >Centro de Innovacion y Emprendimiento</h3> 
                </Title>
                <Row>
                    <Col span={8} >
                        <Card  hoverable   style={{ width: 240, height: 20}} cover={<img src="http://localhost:3000/tutor.jpg"/>}>

                        </Card>
                    </Col>

                    <Col span={8} >
                        <Card  hoverable   style={{ width: 240, height: 20}} cover={<img src="http://localhost:3000/tutor.jpg"/>}>

                        </Card>
                    </Col>

                    <Col span={8} >
                        <Card  hoverable   style={{ width: 240, height: 20}} cover={<img src="http://localhost:3000/tutor.jpg"/>}>

                        </Card>
                    </Col>
                </Row>
          
           </Content>
        );
    }
}


export default Information;