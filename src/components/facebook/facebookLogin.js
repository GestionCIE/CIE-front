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
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.onClickFacebook}
          callback={this.responseFacebook}
          size="metro"
        ></FacebookLogin>
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
// class FacebookLogin extends Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             loggedStatus: false
//         }
//     }

//     componentDidMount(){

//   window.fbAsyncInit = () => {
//     window.FB.init({
//       appId      : '867625357054646',
//       xfbml      : true,
//       version    : 'v7.0'
//     });
//     window.FB.Event.subscribe('auth.statusChange', response =>{
//         this.statusChangeCallback(response)
//     })

//     this.checkLoginStatus();
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//         }(document, 'script', 'facebook-jssdk'));
//     }

//     statusChangeCallback(response){
//         console.log("respuesta", response);
//         if(response.status === "connected"){
//             this.setState({
//                 loggedStatus: true,
//                 userID: response.authResponse.userID
//             })
//         }else{
//             this.setState({
//                 loggedStatus: false,
//             })
//         }

//     }

//     checkLoginStatus(){
//         window.FB.getLoginStatus(response => this.statusChangeCallback(response))
//     }

//     showPersonalData(){
//         if(this.state.loggedStatus){
//             this.props.history.push("/admin")
//         }else{
//             return(
//                 <p>no esta conectado</p>
//             );
//         }
//     }

//     render(){
//         return(
//             <div className="text-center">
//                 {this.showPersonalData()}
//                 <div class="fb-login-button"
//                 data-size="large"
//                 data-button-type="continue_with"
//                 data-layout="default"
//                 data-auto-logout-link="false"
//                 data-use-continue-as="false"
//                 data-width=""></div>
//             </div>
//         );
//     }
// }

export default CFacebookLogin;
