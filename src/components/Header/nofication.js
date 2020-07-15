import React from 'react';
import user from '../../assets/img/man.svg';
import {SocketContext} from './../../routers/context';



class Notification extends React.Component{
    static contextType = SocketContext;

    state = {
        notifications: []
    };

    componentDidUpdate() {
        console.log(this.props.showbell);
    }

    componentDidMount(){
        console.log(this.props.showbell);
        console.log(this.context);
        this.getNotification();
       
    }

    getNotification() {
        this.context.socket.on('/notification', (data) =>{
            console.log(data);
            this.setState({
                notifications: data
            });
        })
    }

    render() {
      
        const data = [{
            avatar: user,
            message: 'Te ha invitado a una reunion',
            time: '12:30 pm',
        }];
        return (
            <SocketContext.Consumer>
                {(context) =>( <div className='Notification' style={{display: this.props.showbell}}>
                         {
                            this.state.notifications.map(item =>{
                                return <div>
                                     <p className="Notification_Title_p">Notificaciones</p>
                                    <div className="Notification_Group">
                                        <div className="Notification_Content">
                                            <img className="Notification_Avatar" src={item.image} />
                                            <div className="Notification_Message">
                                                <span className="text"> {item.from} </span>
                                                <span className="text"> {item.message} </span>
                                                <span className="text hour"> 3:20 am</span> 
                                            </div>
                                        </div> 
        
                                        {/* <div className="Notification_Content">
                                            <img className="Notification_Avatar" src={res.avatar} />
                                            <div className="Notification_Message">
                                                <span className="text"> Cristian vargas </span>
                                                <span className="text"> Te ha invitado a una reunion </span>
                                                <span className="text hour"> 3:20 am</span> 
                                            </div>
                                        </div> 
        
                                        <div className="Notification_Content">
                                            <img className="Notification_Avatar" src={res.avatar} />
                                            <div className="Notification_Message">
                                                <span className="text"> Cristian vargas </span>
                                                <span className="text"> Te ha invitado a una reunion </span>
                                                <span className="text hour"> 3:20 am</span> 
                                            </div>
                                        </div>  */}
                                    </div>
                                </div>
                            })
                        }
                    </div>)
                    }
                
            </SocketContext.Consumer>
        )
    }
}


export default Notification;
