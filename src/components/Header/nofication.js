import React from "react";
import user from "../../assets/img/man.svg";
import { SocketContext } from "./../../routers/context";
import { Row, Col } from "antd";

class Notification extends React.Component {
  static contextType = SocketContext;

  state = {
    notifications: [],
  };

  componentDidUpdate() {
    console.log(this.props.showbell);
  }

  componentDidMount() {
    console.log(this.props.showbell);
    console.log(this.context);
    this.getNotifications();
    this.getNotification();
  }

  getNotifications() {
    this.context.socket.emit("/get/notifications", {
      id: localStorage.getItem("idUser"),
      name: localStorage.getItem("username"),
    });

    this.context.socket.on("/notifications", (data) => {
      this.setState({
        notifications: data,
      });
    });
  }

  getNotification() {
    this.context.socket.on("/notification", (data) => {
      console.log(data);
      this.setState({
        notifications: [data[0], ...this.state.notifications],
      });
    });
  }

  render() {
    const data = [
      {
        avatar: user,
        message: "Te ha invitado a una reunion",
        time: "12:30 pm",
      },
    ];
    return (
      <SocketContext.Consumer>
        {(context) => (
          <div
            className="Notification"
            style={{ display: this.props.showbell }}
          >
            <Row>
              <Col span={24}>
                <p className="Notification_Title"> Notificaciones</p>
              </Col>
              <Col span={24}>
                <div className="Notification_Group">
                  {this.state.notifications.map((item) => {
                    return (
                      <div className="Notification_Content">
                        <img className="Notification_Avatar" src={item.image} />
                        <div className="Notification_Message">
                          <p className="text">
                            {" "}
                            {item.form} {item.message}
                            <span className="text hour">3:20 am</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </SocketContext.Consumer>
    );
  }
}

export default Notification;
