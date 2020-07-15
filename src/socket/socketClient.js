import SocketIOClient from 'socket.io-client';
import React from 'react';

const URL_SOCKET_SERVER  = 'http://localhost:4000';
const Socket = SocketIOClient(URL_SOCKET_SERVER);

class SocketClient extends React.Component {
    
    createSocket() {
        console.log(`ID socket >>>${Socket.id}`);
        Socket.emit('/users',`Socket ID ${Socket.id}` );
    }

    onId() {
        Socket.on('/id', (msg) => {
            console.log("msg >>>" ,msg);
        });
    }
    
    on(event, callback){
        Socket.on(event, (data) => {
            callback(data);
        });  
    }

    emit(event, data){
        Socket.emit(event,data);
    }
}

export default SocketClient;