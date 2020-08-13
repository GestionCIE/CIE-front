import React from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import Http from "./../../api/http";
const http = new Http();

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${
      comments.length > 1 ? "Comentarios" : "Comentario"
    }`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const MicroEditor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea row={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Añadir Comentario
      </Button>
    </Form.Item>
  </>
);

class Comments extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: "",
    idActivity: 0,
  };

  async callGetComments() {
    const res_comments = await this.getComments();
    this.setState({
      idActivity: this.props.idActivity,
      comments: res_comments,
    });
  }

  componentDidUpdate() {
    if (this.state.idActivity != this.props.idActivity) {
      this.callGetComments();
    }
  }

  componentDidMount() {
    this.callGetComments();
    console.log("hora ", moment(new Date(), "YYYY-MM-DD hh:mm:ss").format());
  }

  async saveComment() {
    try {
      await http.post("project/comment/add", {
        idUsers: localStorage.getItem("idUser"),
        idActivity: this.props.idActivity,
        commentary: `${this.state.value}`,
      });
    } catch (error) {
      console.log("saveComment() ", error);
    }
  }

  async getComments() {
    const response = await http.get(
      `project/getComments?idActivity=${this.props.idActivity}`
    );
    console.log(response);
    return response.result;
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.saveComment();
      this.setState({
        submitting: false,
        value: "",
        comments: [
          ...this.state.comments,
          {
            author: "Cristian Vargas",
            avatar: localStorage.getItem("imageUrl"),
            content: <p> {this.state.value} </p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <>
        {this.state.comments.length > 0 && (
          <CommentList comments={this.state.comments} />
        )}
        <Comment
          avatar={
            <Avatar
              src={localStorage.getItem("imageUrl")}
              alt={localStorage.getItem("username")}
            />
          }
          content={
            <MicroEditor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={this.state.submitting}
              value={this.state.value}
            />
          }
        />
      </>
    );
  }
}

export default Comments;
