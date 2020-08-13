import React from "react";
import { Row, Col, Input, Button, Form, Modal, Switch, Space } from "antd";
import Http from "./../../api/http";

const http = new Http();
const { success } = Modal;

class AdvancedSettings extends React.Component {
  state = {
    accessToken: "",
    idPage: "",
    emailPage: "",
    emailNotification: "",
    emailServer: "",
    idFc: "",
    idEm: "",
    disableFc: true,
    disableEm: true,
  };
  componentDidMount() {
    this.getData();
  }

  async getData() {
    const settingFacebook = await http.get("config/facebook");
    const settingEmail = await http.get("config/email");

    if (settingFacebook.result.length > 0)
      this.setState({
        accessToken: settingFacebook.result[0].accessToken,
        idPage: settingFacebook.result[0].idPage,
        emailPage: settingFacebook.result[0].emailPage,
        idFc: settingFacebook.result[0].idSocial,
      });

    if (settingEmail.result.length > 0)
      this.setState({
        emailNotification: settingEmail.result[0].emailNotification,
        emailServer: settingEmail.result[0].emailServer,
        idEm: settingEmail.result[0].idConfigurations,
      });
  }

  createSettingFacebook = async () => {
    const data = {
      accessToken: this.state.accessToken,
      idPage: this.state.idPage,
      emailPage: this.state.emailPage,
      id: this.state.idFc,
    };

    const response = await http.post("config/facebook", data);
    if (response.result === "created" || response.result === "edited")
      success({
        content: "La configuracion de facebook se realizo correctamente",
      });
    this.setState({ disableFc: true });
  };

  createSettingEmail = async () => {
    const data = {
      emailNotification: this.state.emailNotification,
      emailServer: this.state.emailServer,
      id: this.state.idEm,
    };

    const response = await http.post("config/email", data);
    if (response.result === "created" || response.result === "edited")
      success({
        content:
          "La configuracion del servidor de correos se realizo correctamente",
      });
    this.setState({ disableEm: true });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeEditFc = (value) => {
    this.setState({ disableFc: value });
  };

  onChangeEditEm = (value) => {
    this.setState({ disableEm: value });
  };

  render() {
    return (
      <Row>
        <Col span={12}>
          <div className="Div_Setting">
            <div className="Div_Setting_Header">
              <h6>Configuracion de facebook</h6>
              <Space size={8}>
                <h6>Permitir edicion</h6>
                <Switch
                  checked={this.state.disableFc}
                  onChange={this.onChangeEditFc}
                />
              </Space>
            </div>

            <Form className="Div_Setting_Fb_Form">
              <Form.Item>
                <label>Token de acceso de Facebook</label>
                <Input
                  name="accessToken"
                  value={this.state.accessToken}
                  disabled={this.state.disableFc}
                  placeholder="Token de acceso"
                  onChange={this.onChange}
                />
              </Form.Item>

              <Form.Item>
                <label>ID de la pagina de facebook</label>
                <Input
                  name="idPage"
                  value={this.state.idPage}
                  disabled={this.state.disableFc}
                  placeholder="ID de la pagina de facebook"
                  onChange={this.onChange}
                />
              </Form.Item>

              <Form.Item>
                <label>Correo de la pagina</label>
                <Input
                  name="emailPage"
                  value={this.state.emailPage}
                  disabled={this.state.disableFc}
                  placeholder="Coreo de la pagina"
                  onChange={this.onChange}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="Div_Setting_Button"
                  onClick={this.createSettingFacebook}
                >
                  Agregar Configuracion de facebook
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        <Col span={12}>
          <div className="Div_Setting">
            <div className="Div_Setting_Header">
              <h6>Configuracion de correo</h6>
              <Space size={8}>
                <h6>Permitir Edicion</h6>
                <Switch
                  checked={this.state.disableEm}
                  onChange={this.onChangeEditEm}
                />
              </Space>
            </div>

            <Form>
              <Form.Item>
                <label>Email para envio de notificaciones</label>
                <Input
                  name="emailNotification"
                  value={this.state.emailNotification}
                  disabled={this.state.disableEm}
                  placeholder="Email para envio de notificaciones"
                  onChange={this.onChange}
                />
              </Form.Item>
              <Form.Item>
                <label>Servidor de correos</label>
                <Input
                  name="emailServer"
                  placeholder="Servidor de correos"
                  value={this.state.emailServer}
                  disabled={this.state.disableEm}
                  onChange={this.onChange}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="Div_Setting_Button"
                  onClick={this.createSettingEmail}
                >
                  Agregar Configuracion de servidor de correo
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

export default AdvancedSettings;
