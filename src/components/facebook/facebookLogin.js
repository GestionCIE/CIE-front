import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";

class CFacebookLogin extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
  };

  onClickFacebook = () => {};

  responseFacebook = (response) => {
    console.log(response);
  };

  render() {
    let content = null;
    if (this.state.isLoggedIn) {
    } else {
      content = (
        <FacebookLogin
          appId="586619525379688"
          fields="name,email,picture"
          onClick={this.onClickFacebook}
          callback={this.responseFacebook}
          size="small"
          textButton="Ingresar por facebook"
          cssClass="Button_Facebook"
        />
      );
    }

    return (
      <div
        style={{
          width: "100%",
          height: "40px",
        }}
      >
        {content}
      </div>
    );
  }
}

export default CFacebookLogin;
