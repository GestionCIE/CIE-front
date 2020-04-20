import React from "react";
import {Button, DatePicker, version } from "antd";
import "antd/dist/antd.css";

 class App extends React.Component{

  render(){
    return( <div className="App">
    <h1>ant version: {version}</h1>
    <DatePicker/>
    <Button type="primary" style={{marginLeft: 8}}>
      Aceptar
    </Button>
  </div>);

  }
}

export default App;