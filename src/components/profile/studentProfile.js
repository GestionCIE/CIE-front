import React from "react";
import {
  Row,
  Col,
  Modal,
  Button,
  Space,
  Form,
  InputNumber,
  Input,
  Select,
} from "antd";
import Http from "./../../api/http";
import { getIncomeBy, getUserLogged } from "./../../utils/utils";
const http = new Http();
const { Option } = Select;
const { success, error } = Modal;

class StudentProfile extends React.Component {
  state = {
    showModal: false,
    academicProgram: "No hay programa academico",
    incomeBy: "4",
    semester: 0,
  };

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

  onChangeData = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeSem = (value) => {
    this.setState({
      semester: value,
    });
  };
  onChangeType = (value) => {
    this.setState({
      incomeBy: value,
    });
  };

  componentDidMount() {
    this.getDataStudent();
  }

  async getDataStudent() {
    const id = getUserLogged().id;
    const response = await http.get(`users/student?id=${id}`);
    if (response.result.length == 1) {
      this.setState({
        academicProgram: response.result[0].academicProgram,
        semester: response.result[0].semester,
        incomeBy: response.result[0].incomeBy,
      });
    }
  }

  createStudent = async () => {
    const id = getUserLogged().id;
    const data = {
      id: id,
      academicProgram: this.state.academicProgram,
      semester: this.state.semester,
      incomeBy: this.state.incomeBy,
    };

    const response = await http.post("users/student", data);
    if (response.result === "created") {
      success({
        content: "Se agrego la informacion correctamente",
      });
      this.getDataStudent();
      this.closeModal();
    } else {
      error({
        content: "No se ha podido agregar la información",
      });
    }
  };

  render() {
    return (
      <Row>
        <Col span={12}>
          <h6>Perfil Academico</h6>
          <p>
            <b>Programa Academico: </b>{" "}
            <span>{this.state.academicProgram}</span>{" "}
          </p>
          <p>
            <b>Semestre Actual: </b> <span>{this.state.semester}</span>{" "}
          </p>
          <p>
            <b>Ingreso del proyecto por: </b>{" "}
            <span>{getIncomeBy(this.state.incomeBy)}</span>{" "}
          </p>{" "}
          <br />
          <Button type="primary" onClick={this.showModal}>
            Agregar Informacion Academica
          </Button>
        </Col>
        <Modal
          visible={this.state.showModal}
          onCancel={this.closeModal}
          title="Información Academica"
          footer={null}
        >
          <Form>
            <Form.Item>
              <label>Programa Academico</label>
              <br />
              <Input
                name="academicProgram"
                placeholder="Programa academico"
                onChange={this.onChangeData}
                value={this.state.academicProgram}
              />
            </Form.Item>

            <Form.Item>
              <label>Semestre Actual</label>
              <br />
              <InputNumber
                name="semester"
                placeholder="Semestre actual"
                onChange={this.onChangeSem}
                value={this.state.semester}
              />
            </Form.Item>

            <Form.Item>
              <label>Ingreso del proyecto por</label>
              <Select value="ingreso por" onChange={this.onChangeType}>
                <Option key={1} value="1">
                  {" "}
                  Practicas{" "}
                </Option>
                <Option key={2} value="2">
                  {" "}
                  Opción de grado{" "}
                </Option>
                <Option key={3} value="3">
                  {" "}
                  Internacionalización{" "}
                </Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={this.createStudent}>
                Agregar Información Academica
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    );
  }
}

export default StudentProfile;
