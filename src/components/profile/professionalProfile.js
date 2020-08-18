import React from "react";
import { Row, Col, Form, Modal, Button, Input, InputNumber, Space } from "antd";
import Http from "../../api/http";
import { getUserLogged } from "../../utils/utils";

const http = new Http();
const { success, error } = Modal;

class ProfesionalProfile extends React.Component {
  state = {
    universityDegrees: "No ha registrado sus titulos",
    experience: 0,
    showModal: false,
  };

  componentDidMount() {
    this.getDataAdvisers();
  }

  async getDataAdvisers() {
    const { id } = getUserLogged();
    const response = await http.get(`users/adviser?id=${id}`);
    if (response.result.length > 0) {
      this.setState({
        universityDegrees: response.result[0].universityDegrees,
        experience: response.result[0].experience,
      });
    }
  }

  showModal = () => {
    this.setState({
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  registerData = async () => {
    const data = {
      idUsersAd: getUserLogged().id,
      universityDegrees: this.state.universityDegrees,
      experience: this.state.experience,
    };

    const response = await http.post("users/adviser", data);
    if (response.result === "created") {
      success({
        content: "Se Agrego la informacion profesoinal correctamente",
      });
    } else {
      error({
        content: "A ocurrido un error al agregar la información profesional",
      });
    }
  };

  onchangeData = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeExp = (value) => {
    this.setState({
      experience: value,
    });
  };

  render() {
    return (
      <Row>
        <Col span={12}>
          <h6>Perfil Profesional</h6>
          <br />
          <p>
            <b>Carrera Profesional: </b>

            <span>{this.state.universityDegrees}</span>
          </p>
          <p>
            <b>Experiencia Profesional</b>

            <span>{this.state.experience}</span>
          </p>
          <br />
          <Button type="primary" onClick={this.showModal}>
            Agregar Informacion Profesional
          </Button>
        </Col>
        <Modal
          visible={this.state.showModal}
          footer={null}
          onCancel={this.closeModal}
          title="Informacion Profesional"
        >
          <Row>
            <Col span={24}>
              <Form>
                <Form.Item>
                  <label>Titulo Profesional</label>
                  <br />
                  <Input
                    className="Form_Item_Input"
                    value={this.state.universityDegrees}
                    name="universityDegrees"
                    placeholder="Titulo Profesional"
                    onChange={this.onchangeData}
                  />
                </Form.Item>

                <Form.Item>
                  <label> Años de Experiencia Profesional</label>

                  <br />
                  <InputNumber
                    className="Form_Item_Input"
                    value={this.state.experience}
                    name="experience"
                    placeholder="Exp"
                    onChange={this.onChangeExp}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    className="Form_Item_Button"
                    onClick={this.registerData}
                  >
                    Añadir Datos profesionales
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
      </Row>
    );
  }
}

export default ProfesionalProfile;
