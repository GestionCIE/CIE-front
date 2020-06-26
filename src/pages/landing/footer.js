import React from 'react';
import { Row, Col,} from "antd";
import footer_americana from '../../assets/footer_americana.png'

class Footer extends React.Component {
    render(){
        return(
            <div className="Footer">
            <div className="Footer_Info">
            <Row>
                <Col className="Footer_Info_1" span={8}>
                  <p>Edificios</p>
                  <p>Cosmo: calle 72 No. 41c - 64</p>
                  <p>Barranquilla - Atlantico</p>
                </Col>
                <Col className="Footer_Info_2" span={8} >
                  <p>Contactos</p>
                  <p>Telefono: 3827745</p>
                  <p>Celular: 3017591492</p>
                  <p>Correo Electronico:</p>
                  <p>gestioncie@americana.edu.co</p>
                </Col>
                <Col className="Footer_Info_3" span={8}>
                  <img className="Img_Footer_Americana"src={footer_americana} />
                </Col>
              </Row>
            </div>
             <div className="Footer_Copyright"> 
             <Row>
                <Col className="Copyright" span={24}>
                  <p>Corporación Universitaria Americana - Todos los derechos reservados</p>
                </Col>
              </Row>
             </div>
             
          </div>
        )
    }
}

export default Footer;