import React, { createContext } from "react";
import SocketClient from "../socket/socketClient";

const socket = new SocketClient();
export const SocketContext = createContext();
socket.createSocket();
class SocketContextProvider extends React.Component {
  state = {
    socket: socket,
    hi: "hola",
  };

  render() {
    return (
      <SocketContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default SocketContextProvider;
