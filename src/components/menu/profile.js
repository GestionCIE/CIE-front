import React from "react";
import { Avatar } from "antd";
import { getRole } from "../../utils/utils";
import "./index.css";

class Profile extends React.Component {
  state = {
    username: "",
    role: "",
  };

  getDataProfile() {
    console.log(localStorage.getItem("username"));
    console.log("image ", localStorage.getItem("imageUrl"));
    this.setState({
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    });
  }

  componentDidMount() {
    this.getDataProfile();
  }

  render() {
    return (
      <div className="profile">
        <Avatar
          size={40}
          src={
            this.props.avatar !== ""
              ? this.props.avatar
              : localStorage.getItem("imageUrl")
          }
          style={{ top: "5%" }}
        />
        <span className="profile-text">{this.state.username}</span>
        <span className="profile-text">{getRole(this.state.role)}</span>
      </div>
    );
  }
}

export default Profile;
