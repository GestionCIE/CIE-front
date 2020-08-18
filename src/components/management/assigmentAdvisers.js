import React from "react";
import { Modal, Form, Row, Col, Select, Button } from "antd";
import giveImg from "../../assets/give.svg";
import Http from "../../api/http";

const http = new Http();

const { success } = Modal;
const { Option } = Select;

class AssigmentAdviser extends React.Component {
  state = {
    advisers: [],
    idAssigned: "",
    phase: "",
  };

  close = () => {
    this.props.closeModalAssigment();
  };

  async getAdvisers() {
    const response = await http.get("users/getAllAdvisers");
    this.setState({
      advisers: response.result,
    });
  }

  componentDidMount() {
    this.getAdvisers();
  }

  onChangeAdvisers = (data) => {
    console.log("onChange: ", data);
    this.setState({
      idAssigned: data,
    });
  };

  onChangePhases = (data) => {
    console.log("onChange: ", data);
    this.setState({
      phase: data,
    });
  };

  createAssignment = async () => {
    const data = {
      idAssigned: this.state.idAssigned,
      phase: this.state.phase,
      idProject: this.props.idProject,
    };
    const response = await http.post("project/createAssignment", data);
    if (response.result == "created") {
      success({ content: `se ha asignado a la fase ${this.state.phase}` });
      this.props.closeModalAssigment();
    }
  };

  render() {
    return (
      <Modal
        width="40%"
        title="Asignar asesores a una fase metodologica"
        visible={this.props.showModalAssigment}
        onCancel={this.close}
        footer={null}
      >
        <Row>
          <Col span={12}>
            <img className="Img_Give" src={giveImg} />
          </Col>
          <Col span={12}>
            <Form>
              <Form.Item>
                <label>Selecione un Asesor</label>
                <Select
                  className="Select_Assigment"
                  onChange={this.onChangeAdvisers}
                >
                  {this.state.advisers.map((e) => (
                    <Option key={e.idUsers}>{e.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <label>Selecione una fase</label>
                <Select
                  className="Select_Assigment"
                  onChange={this.onChangePhases}
                >
                  {this.props.phases.map((e) => (
                    <Option key={e.phase}>{e.phase}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="Select_Assigment"
                  onClick={this.createAssignment}
                >
                  Asignar fase
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default AssigmentAdviser;
