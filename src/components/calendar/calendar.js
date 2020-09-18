import React from "react";
import {
  Calendar,
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Tag,
  Modal,
  Space,
  DatePicker,
  TimePicker,
  Drawer,
} from "antd";
import moment from "moment";

import { getUserLogged, breakStringDate } from "./../../utils/utils";
import Http from "./../../api/http";
import "./calendar.css";
import MeetingDetail from "./meetingDetail";
const { Option } = Select;
const { success } = Modal;
const http = new Http();

class CalendarC extends React.Component {
  state = {
    showModal: false,
    visibleDetail: false,
    title: "",
    purpose: "",
    guests: [],
    meetings: [],
    meetingDetail: [],
    idGuests: "",
    date: moment(new Date(), "YYYY-MM-DD"),
    hour: moment("12:00", "HH:mm"),
  };

  componentDidMount() {
    this.getGuets();
    this.getMetting();
  }

  async getMetting(month, year) {
    const { result } = await http.get(
      `calendar/metting?month=${month}&year?=${year}&user=${getUserLogged().id}`
    );
    console.log(result);
    this.setState({
      meetings: result,
    });
  }

  async getGuets() {
    const { result } = await http.get("users/guests");
    this.setState({ guests: result });
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeGuest = (value) => {
    const ids = value.join(",");
    this.setState({ idGuests: ids });
  };

  onChangeDate = (value) => {
    this.setState({ date: value });
  };

  onChangeHour = (value) => {
    this.setState({ hour: value });
  };

  createMetting = async () => {
    const { title, purpose, idGuests, date, hour } = this.state;
    const data = {
      title,
      purpose,
      idGuests,
      date: date.format("YYYY-MM-DD"),
      hour: hour.format("hh:mm"),
      idRes: getUserLogged().id,
    };
    const { result } = await http.post("calendar/metting", data);

    if (result === "created") {
      success({ content: "Se ha añadido una nueva reunion" });
      this.closeModal();
    }
    console.log(data);
  };

  getResponsable = () => {
    return getUserLogged().name;
  };

  searchData(value) {
    const { meetings } = this.state;
    this.temp = [];
    for (let i = 0; i < meetings.length; i++) {
      const date = breakStringDate(meetings[i].date);
      if (
        value.year() == date.year &&
        value.month() == date.month &&
        value.date() == date.day
      ) {
        // const responsable =  await this.getProfile(meetings[i].idRes);
        // const guests = await this.getProfile(meetings[i].idGuests);
        // console.log("responsable ", responsable, " guests ", guests);
        this.temp.push(meetings[i]);
      }
    }
    return this.temp;
  }

  dateCellRender = (value) => {
    const data = this.searchData(value);
    if (data.length > 0) {
      console.log(data);
      return (
        <div>
          {data.map((item) => {
            return <p>{item.title}</p>;
          })}
        </div>
      );
    }
    return null;
  };

  selectCellCalendar = (value) => {
    const data = this.searchData(value);
    if (data.length > 0) {
      this.showDetail();
      console.log(data);
    }
  };

  detailMetting = () => {
    const { visibleDetail } = this.state;
    return (
      // <Drawer
      //   title="Detalle de reuniones"
      //   visible={visibleDetail}
      //   onClose={this.closeDetail}
      // ></Drawer>
      <MeetingDetail
        detail={this.temp}
        visibleDetail={visibleDetail}
        closeDetail={this.closeDetail}
      />
    );
  };

  getProfile = async (id) => {
    const responsable = await http.get(`users/name?id=${id}`);
    console.log(responsable);
  };

  showDetail = () => {
    this.setState({ visibleDetail: true });
  };

  closeDetail = () => {
    this.setState({ visibleDetail: false });
  };

  render() {
    const { showModal, title, purpose, guests, hour, date } = this.state;

    return (
      <Row gutter={[4, 8]}>
        <Col span={24}>
          <Button type="primary" onClick={this.showModal}>
            Crear Reunión
          </Button>
          <Modal
            visible={showModal}
            onCancel={this.closeModal}
            footer={null}
            title="Reunión"
          >
            <Form>
              <Form.Item>
                <Space size={8}>
                  <label>Responsable de la reunión</label>
                  <Tag color="success">{this.getResponsable()}</Tag>
                </Space>
              </Form.Item>
              <Form.Item>
                <label>Titulo de la reunión</label>
                <Input name="title" onChange={this.onChange} value={title} />
              </Form.Item>
              <Form.Item>
                <label>Proposito</label>
                <Input
                  name="purpose"
                  onChange={this.onChange}
                  value={purpose}
                />
              </Form.Item>
              <Form.Item>
                <label>Personas a invitar</label>
                <Select
                  mode="multiple"
                  onChange={this.onChangeGuest}
                  placeholder="Invitados"
                >
                  {guests.map((item, i) => {
                    return <Option value={item.idUsers}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
              <Form.Item>
                <Space size={8}>
                  <label>Fecha de la reunión</label>
                  <DatePicker onChange={this.onChangeDate} value={date} />
                  <TimePicker
                    onChange={this.onChangeHour}
                    format="HH:mm"
                    value={hour}
                  />
                </Space>
              </Form.Item>
              <Form.Item>
                <Button
                  className="Button_Create_Metting"
                  type="primary"
                  onClick={this.createMetting}
                >
                  Agregar Reunión al calendario
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
        <Col span={24}>
          <Calendar
            dateCellRender={this.dateCellRender}
            onSelect={this.selectCellCalendar}
          />
          {this.detailMetting()}
        </Col>
      </Row>
    );
  }
}

export default CalendarC;
