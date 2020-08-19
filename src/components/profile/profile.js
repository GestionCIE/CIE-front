import React from "react";
import {
  Row,
  Col,
  Upload,
  Button,
  Form,
  Input,
  Steps,
  Select,
  Tag,
  Modal,
  Tabs,
} from "antd";
import "antd/dist/antd.css";
import { LoadingOutlined, PlusOutlined, LockOutlined } from "@ant-design/icons";
import "./profile.css";
import Http from "../../api/http";
import Security from "../../assets/security.svg";
import { whatRelationship, getRole, getRelationship } from "../../utils/utils";
import ProfesionalProfile from "./professionalProfile";
import StudentProfile from "./studentProfile";

const http = new Http();
const { Step } = Steps;
const { warning } = Modal;
const { Option } = Select;
const { TabPane } = Tabs;

class ProfileComponent extends React.Component {
  state = {
    loading: false,
    modalEditProfile: false,
    modalChangePassword: false,
    current: 0,
    name: "",
    username: "",
    role: "",
    relationshipUniversity: "",
    phone: "",
    mobile: "",
    email: "",
    imageUrl: "",
    project: "",
    rol: "",
    currentPassword: "",
    newPassword: "",
    load: false,
  };

  async getProfile() {
    const response = await http.get(
      `users/getUserById?id=${localStorage.getItem("idUser")}`
    );
    const user = response.result[0];
    console.log(response);
    const { project } = response;
    this.setState({
      name: user.name,
      username: user.username,
      role: user.role,
      relationshipUniversity: user.relationshipUniversity,
      phone: user.phone,
      mobile: user.mobile,
      email: user.email,
      imageUrl: user.image,
      project: project.projectName,
      rol: project.rol,
    });
  }

  componentDidMount() {
    this.getProfile();
  }

  componentDidUpdate() {
    if (!this.state.load) {
      this.getProfile();
      this.setState({
        load: true,
      });
    }
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  showModalEditProfile = () => {
    this.setState({
      modalEditProfile: true,
    });
  };

  closeModalEditProfile = () => {
    this.setState({
      modalEditProfile: false,
    });
  };

  onChangeForm = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  uploadButton = () => (
    <div>
      {this.state.loading} ? <LoadingOutlined /> : <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  beforeUpload = async (file) => {
    const isImg = file.type === "image/jpeg" || file.type === "image/png";
    if (!isImg) warning("Error al subir la foto");
    const response = await http.post("users/writeIdProfile", {
      id: localStorage.getItem("idUser"),
    });
    console.log("before", response);
    return isImg;
  };

  changeProfileFather(img) {
    this.props.handle(img);
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  onChange = (info) => {
    console.log(info.file);
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status == "done") {
      this.getBase64(info.file.originFileObj, (imageUrl) => {
        this.changeProfileFather(imageUrl);
        this.setState({
          imageUrl,
          loading: false,
        });
      });
    }
  };

  basicData = () => {
    return (
      <Form>
        <Form.Item>
          <label>Ingresar nombre</label>
          <Input
            name="name"
            value={this.state.name}
            onChange={this.onChangeForm}
          />
        </Form.Item>
        <Form.Item>
          <label>Ingresar nombre de usuario</label>
          <Input
            name="username"
            value={this.state.username}
            onChange={this.onChangeForm}
          />
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={12}>
              <label>Tipo de Usuario</label> <br />
              <Tag color="#108ee9">{getRole(this.state.role)}</Tag>
            </Col>
            <Col span={12}>
              <label>Relacion con la CUA </label>
              <br />
              <Tag color="#108ee9">
                {getRelationship(this.state.relationshipUniversity)}
              </Tag>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    );
  };

  contactInformation = () => {
    return (
      <Form>
        <Form.Item>
          <label>Correo Eletronnico</label>
          <Input
            name="email"
            value={this.state.email}
            onChange={this.onChangeForm}
          />
        </Form.Item>
        <Form.Item>
          <label>Telefono</label>
          <Input
            name="phone"
            value={this.state.phone}
            onChange={this.onChangeForm}
          />
        </Form.Item>
        <Form.Item>
          <label>Celular </label>
          <Input
            name="mobile"
            value={this.state.mobile}
            onChange={this.onChangeForm}
          />
        </Form.Item>
      </Form>
    );
  };

  proyect = () => {
    return (
      <Form>
        <Form.Item>
          <Row>
            <Col span={12}>
              <label>Proyecto Actual</label> <br />
              <Tag color="#108ee9"> {this.state.project} </Tag>
            </Col>
            <Col span={12}>
              <label>Rol</label>
              <br />
              <Tag className="Tag_Rol" color="#108ee9">
                {this.state.rol}
              </Tag>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    );
  };

  handleEdit = async () => {
    const data = { ...this.state, id: localStorage.getItem("idUser") };
    const response = await http.post("users/editUser", data);
    console.log(response);
    if (response.result == "edited") {
      Modal.success({ content: "El perfil se ha actualizado" });
      this.closeModalEditProfile();
    } else {
      Modal.success({ content: "El perfil no pudo ser actualizado" });
      this.closeModalEditProfile();
    }
  };

  changePassword = () => {};

  modalChangePassword() {
    return (
      <Modal
        title="Cambiar contraseña"
        visible={this.state.modalChangePassword}
        onCancel={this.closeModalPassword}
        footer={null}
      >
        <Row>
          <Col span={12}>
            <Form>
              <Form.Item name="hh">
                <p>Contraseña actual</p>
                <Input.Password
                  placeholder="Ingresa tu contrasena actual"
                  name="currentPassword"
                  value={this.state.currentPassword}
                  onChange={this.onChangeForm}
                />
              </Form.Item>
              <Form.Item
                name="newPassword"
                hasFeedback
                rules={[
                  { required: true, message: "Ingresa la nueva contraseña" },
                ]}
              >
                <p>Nueva contraseña</p>
                <Input.Password
                  placeholder="Nueva contraseña"
                  name="newPassword"
                  value={this.state.newPassword}
                  onChange={this.onChangeForm}
                  prefix={<LockOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="r-newPassword"
                hasFeedback
                rules={[
                  { required: true, message: "Repite la contraseña" },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("newPassword") == value)
                        return Promise.resolve();
                      return Promise.reject("La contraseña no coincide");
                    },
                  }),
                ]}
                dependencies={["newPassword"]}
              >
                <p>Repite contraseña</p>
                <Input.Password
                  placeholder="Repite contraseña"
                  name="r-newPassword"
                  prefix={<LockOutlined />}
                />
              </Form.Item>

              <Form.Item name="jj">
                <Button
                  type="primary"
                  onClick={this.changePassword}
                  className="Btn_ChangePassword"
                >
                  Cambiar Contraseña
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <img src={Security} className="Img_ChangePassword" />
          </Col>
        </Row>
      </Modal>
    );
  }

  showModalPassword = () => {
    this.setState({
      modalChangePassword: true,
    });
  };

  closeModalPassword = () => {
    this.setState({
      modalChangePassword: false,
    });
  };

  render() {
    const titles_steps = [
      { title: "Datos Basicos", content: this.basicData },
      { title: "Contactos", content: this.contactInformation },
      { title: "Proyecto Asociado", content: this.proyect },
    ];

    return (
      <Tabs>
        <TabPane tab="Perfil General" key={1}>
          <Row>
            <Col span={10}>
              <h6>Perfil de usuario</h6>
              <Upload
                name="profile"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={http.uploadImage("users/uploadProfile")}
                beforeUpload={this.beforeUpload}
                onChange={this.onChange}
              >
                {this.state.imageUrl ? (
                  <img
                    src={this.state.imageUrl}
                    alt="avatar"
                    style={{ width: "100%", maxHeight: "10vh" }}
                  />
                ) : (
                  this.uploadButton
                )}
              </Upload>

              <div className="Profile_Data_Contact">
                <h6>Datos de contacto</h6>
                <br />
                <p>
                  <b>Correo Electronico: </b>
                </p>
                <p>{this.state.email}</p>
                <p>{this.state.phone}</p>
                <p>
                  <b>Telefono:</b>
                  <span>
                    {this.state.phone !== undefined
                      ? this.state.phone
                      : "No tiene telefono"}
                  </span>
                </p>
                <p>
                  <b>Celular:</b>
                  <span>
                    {this.state.mobile !== undefined
                      ? this.state.mobile
                      : "No tiene celular"}
                  </span>
                </p>
              </div>
              <div className="Profile_Buttons">
                <Button onClick={this.showModalPassword} type="primary">
                  Cambiar Contraseña
                </Button>
                <Button onClick={this.showModalEditProfile} type="primary">
                  Editar Perfil
                </Button>
              </div>
            </Col>
            <Col span={12}>
              <div className="Profile_Content_Col2">
                <div>
                  <h6>Datos Basicos</h6>
                  <p>
                    <b>Nombre: </b> <span>{this.state.name} </span>
                  </p>
                  <p>
                    <b>Tipo de usuario: </b>
                    <span>{getRole(this.state.role)}</span>
                  </p>
                  <p>
                    <b>Relacion con la CUA: </b>
                    <span>
                      {getRelationship(this.state.relationshipUniversity)}
                    </span>
                  </p>
                </div>

                <div>
                  <h6>Proyecto</h6>
                  <p>
                    <b>Proyecto Actual: </b> <span>{this.state.project}</span>
                  </p>
                  <p>
                    <b>Rol: </b> <span>{this.state.rol}</span>
                  </p>
                </div>
              </div>
            </Col>
            <Modal
              title="Edición del Perfil de usuario"
              visible={this.state.modalEditProfile}
              onCancel={this.closeModalEditProfile}
              onOk={this.closeModalEditProfile}
            >
              <Row>
                <Col span={24}>
                  <Steps current={this.state.current}>
                    {titles_steps.map((item) => (
                      <Step key={item.title} title={item.title} />
                    ))}
                  </Steps>
                  <div className="steps-content">
                    {titles_steps[this.state.current].content()}
                  </div>
                  <div className="steps-action">
                    {this.state.current < titles_steps.length - 1 && (
                      <Button type="primary" onClick={() => this.next()}>
                        Siguiente
                      </Button>
                    )}

                    {this.state.current === titles_steps.length - 1 && (
                      <Button type="primary" onClick={() => this.handleEdit()}>
                        Editar
                      </Button>
                    )}

                    {this.state.current > 0 && (
                      <Button
                        type="primary"
                        style={{ margin: "0 8px" }}
                        onClick={() => this.prev()}
                      >
                        Anterior
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Modal>
            {this.modalChangePassword()}
          </Row>
        </TabPane>
        {whatRelationship("personalIntern") ? (
          <TabPane tab="Datos profesionales" key={2}>
            <ProfesionalProfile />
          </TabPane>
        ) : null}

        {whatRelationship("external") ? (
          <TabPane tab="Datos emprendedor externo" key={3}>
            <ProfesionalProfile />
          </TabPane>
        ) : null}

        {whatRelationship("student") ? (
          <TabPane tab="Datos del estudiante" key={4}>
            <StudentProfile />
          </TabPane>
        ) : null}
      </Tabs>
    );
  }
}

export default ProfileComponent;
