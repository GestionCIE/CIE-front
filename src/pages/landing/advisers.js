import React from 'react';
import {Row, Col, Card, Space} from 'antd';
import Footer from './footer';

const {Meta} = Card;


class Advisers extends React.Component {
    render() {
        return (
       
        <Row>
            <Col span={24}>
                <h3 className="Adviser_Title">Asesores del Centro de Innovacion y emprendimiento</h3>
                <h6 className="Adviser_Title_Secondary">Docentes de la corporacion universitaria americana</h6>
                <h6 className="Adviser_Title_Secondary">Que dirigin los proyectos de emprendimiento</h6>
            </Col>
            <Col span={24}>
            <div className="Content_Advisers"> 
          
          <Row gutter={[5,10]} style={{ justifyContent: 'center'}}>
              {/* <Space size={6}> */}
              <Col span={6}>
                  <Card className="Child"
                      hoverable
                      style={{ width: 260 }}
                      cover={<img  height="260px" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                      <Meta title="Europe Street beat" description="www.instagram.com" />
                  </Card>
              </Col>
              <Col span={6}>
              <Card className="Child"
                      hoverable
                      style={{ width: 260 }}
                      cover={<img  height="260px" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                      <Meta title="Europe Street beat" description="www.instagram.com" />
                  </Card>
              </Col>

              <Col span={6} >
              <Card className="Child"
                      hoverable
                      style={{ width: 260 }}
                      cover={<img  height="260px" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                      <Meta title="Europe Street beat" description="www.instagram.com" />
                  </Card>
              </Col>

              <Col span={6}>
              <Card className="Child"
                      hoverable
                      style={{ width: 260 }}
                      cover={<img  height="260px" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                      <Meta title="Europe Street beat" description="www.instagram.com" />
                  </Card>
              </Col>

              <Col span={6}>
              <Card className="Child"
                      hoverable
                      style={{ width: 260 }}
                      cover={<img  height="260px" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                      <Meta title="Europe Street beat" description="www.instagram.com" />
                  </Card>
              </Col>

              <Col span={6}>
              <Card className="Child"
                      hoverable
                      style={{ width: 260 }}
                      cover={<img  height="260px" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                      <Meta title="Europe Street beat" description="www.instagram.com" />
                  </Card>
              </Col>
              {/* </Space> */}
            
          </Row>          
    
        </div>
           
            </Col>
            <Col span={
                24
            }>
                <Footer />
            </Col>
        </Row>
  
         )
    }
}


export default Advisers;
