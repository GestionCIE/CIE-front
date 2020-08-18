import React from "react";
import {
  Row,
  Col,
  Table,
  Collapse,
  List,
  Select,
  Switch,
  Button,
  Modal,
  Form,
  Input,
  Tag,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Http from "../../api/http";

const http = new Http();
const { Panel } = Collapse;
const { Option } = Select;
const { success, confirm, error } = Modal;

class RoleSettings extends React.Component {
  state = {
    data: [],
    moduleAdviser: [],
    moduleAssistant: [],
    moduleEntrepreneur: [],
    showModal: false,
    name: "",
    username: "",
    password: "",
    email: "",
    relationshipUniversity: "personalIntern",
    role: "",
  };

  componentDidMount() {
    this.getAllUsers();
    this.getSystemModules();
  }

  async getAllUsers() {
    const _data = [];
    const response = await http.get("users/admin/getAllUsers");
    for (let i = 0; i < response.result.length; i += 1) {
      _data.push(response.result[i]);
    }
    this.setState({ data: _data });
  }

  getRole(role) {
    let span = <Button>Editar</Button>;
    console.log(role);
    if (role == "role-pending") {
      span = <span> Pendiente de asignacion </span>;
    } else if (role == "entrepreneur") {
      span = <span> Emprendedor </span>;
    } else if (role == "adviser") {
      span = <span> Asesor </span>;
    } else if (role === "assistant") {
      span = <span> Asistente </span>;
    } else if (role == "administrator") {
      span = <span> Administrador </span>;
    } else {
      span = <span> Sin rol </span>;
    }

    return span;
  }

  setNewRole = async (value) => {
    const data = { role: value.split(" ")[0], id: value.split(" ")[1] };
    const response = await http.post("users/admin/updateRole", data);
    if (response.result === "edited") {
      success({ content: "Ha cambiado correctamente el rol del usuario" });
      this.getAllUsers();
    }
  };

  onChangeRole = (value) => {
    const cvalue = value.split(" ")[0];
    console.log(cvalue);
    this.setState({ role: cvalue });
  };

  createSelectOption(id) {
    const contentValue = id > 0 ? "Selecionar Rol" : this.state.role;
    const action = id > 0 ? this.setNewRole : this.onChangeRole;
    const select = (
      <Select value={contentValue} onChange={action}>
        <Option value={`adviser ${id > 0 ? id : ""}`}>Asesor</Option>
        <Option value={`assistant ${id > 0 ? id : ""}`}>Asistente</Option>
        <Option value={`administrator ${id > 0 ? id : ""}`}>
          Administrador
        </Option>
      </Select>
    );
    return select;
  }

  async getSystemModules() {
    const response = await http.get("config/getSystemModules");

    this.setState({
      moduleAdviser: response.result.adviser,
      moduleAssistant: response.result.assistant,
      moduleEntrepreneur: response.result.entrepreneur,
    });
  }

  deactivate = async (state, id) => {
    const data = { visible: state, id };
    const response = await http.post("config/updateVisible", data);
    if (response.result == "edited") {
      success({ content: "Se cambio el estado del modulo" });
      this.getSystemModules();
    }
  };

  deleteUser = (id) => {
    const deleteOk = async () => {
      const response = await http.post("config/deleteUser", { id });
      if (response.result === "erased") {
        success({ content: "Se ha eliminado el usuario del sistema" });
        this.getAllUsers();
      }
    };

    confirm({
      title: "Eliminar usuario",
      content: "¿Desea eliminar este usuario?",
      onOk: deleteOk,
    });
  };

  deleteButton = (id) => {
    return (
      <Button type="danger" onClick={() => this.deleteUser(id)}>
        Eliminar usuario
      </Button>
    );
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onChangeData = (e) => {
    console.log(`${e.target.name} ${e.target.value}`);
    this.setState({ [e.target.name]: e.target.value });
  };

  createUser = async () => {
    const data = {
      fullname: this.state.name,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      relationship: this.state.relationshipUniversity,
      role: this.state.role,
    };

    console.log(data);
    const response = await http.post("users/createUser", data);
    if (response.result === "created") {
      success({
        content: "Usuario se creo correctamente",
      });

      this.getAllUsers();
    } else {
      error({ content: "No se creo el usuario correctamente" });
    }
    this.closeModal();
  };

  render() {
    const columns = [
      {
        title: "Nombre",
        dataIndex: "name",
      },
      {
        title: "Usuario",
        dataIndex: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Rol del usuario",
        dataIndex: "role",
        render: (text, recoder) => this.getRole(recoder.role),
      },
      {
        title: "Asignar Nuevo rol",
        render: (text, recoder) => this.createSelectOption(recoder.idUsers),
      },

      {
        title: "Eliminar Usuario",
        render: (text, recoder) => this.deleteButton(recoder.idUsers),
      },
    ];

    return (
      <>
        <Row>
          <Col span={17}>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={this.showModal}
            >
              Crear Usuario
            </Button>
            <h6>Roles de usuario</h6>
            <Table
              size="small"
              rowKey={(recoder) => recoder.idUsers}
              columns={columns}
              dataSource={this.state.data}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Collapse accordion>
              <Panel header="Activacion de los Modulo del Asistente">
                <List
                  dataSource={this.state.moduleAssistant}
                  renderItem={(item) => (
                    <List.Item>
                      <span>{item.name}</span>
                      <Switch
                        key={item.idSystemModules}
                        onChange={(e) => this.deactivate(e, item.id)}
                        checked={item.active}
                      />
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
            <Collapse accordion>
              <Panel header="Activacion de los Modulo del asesor">
                <List
                  dataSource={this.state.moduleAdviser}
                  renderItem={(item) => (
                    <List.Item>
                      <span>{item.name}</span>
                      <Switch
                        key={item.idSystemModules}
                        onChange={(e) => this.deactivate(e, item.id)}
                        checked={item.active}
                      />
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
            <Collapse accordion>
              <Panel header="Activacion de los Modulo del emprendedor">
                <List
                  dataSource={this.state.moduleEntrepreneur}
                  renderItem={(item) => (
                    <List.Item>
                      <span>{item.name}</span>
                      <Switch
                        key={item.idSystemModules}
                        onChange={(e) => this.deactivate(e, item.id)}
                        checked={item.active}
                      />
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
          </Col>
          <Modal
            visible={this.state.showModal}
            footer={false}
            onCancel={this.closeModal}
            title="Crear Usuario"
          >
            <Form>
              <Form.Item>
                <label>Nombre completo</label>
                <Input
                  value={this.state.name}
                  name="name"
                  onChange={this.onChangeData}
                />
              </Form.Item>
              <Form.Item>
                <label>Nombre de usuario</label>
                <Input
                  value={this.state.username}
                  name="username"
                  onChange={this.onChangeData}
                />
              </Form.Item>
              <Form.Item>
                <label>Contraseña</label>
                <Input
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangeData}
                />
              </Form.Item>
              <Form.Item>
                <label>Email</label>
                <Input
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeData}
                />
              </Form.Item>
              <Form.Item>
                <label>Rol</label>
                {this.createSelectOption()}
              </Form.Item>
              <Form.Item>
                <label>Relacion con la universiad </label>
                <Tag color="blue"> Personal de la institución </Tag>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="Btn_Create_User"
                  type="primary"
                  onClick={this.createUser}
                >
                  Crear Usuario
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Row>
      </>
    );
  }
}

export default RoleSettings;
