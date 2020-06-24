import React from 'react';
import user from '../../assets/img/man.svg';
class Notification extends React.Component{

    componentDidUpdate() {
        console.log(this.props.showbell);
    }

    componentDidMount(){
        console.log(this.props.showbell);
    }
    render() {
        const data = [{
            avatar: user,
            message: 'Te ha invitado a una reunion',
            time: '12:30 pm',
        }];
        return (
            <div className='Notification' style={{display: this.props.showbell}}>
                {
                    data.map(res =>{
                        return <div>
                             <p className="Notification_Title_p">Notificaciones</p>
                            <div className="Notification_Group">
                                <div className="Notification_Content">
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
                                </div> 

                                <div className="Notification_Content">
                                    <img className="Notification_Avatar" src={res.avatar} />
                                    <div className="Notification_Message">
                                        <span className="text"> Cristian vargas </span>
                                        <span className="text"> Te ha invitado a una reunion </span>
                                        <span className="text hour"> 3:20 am</span> 
                                    </div>
                                </div> 
                            </div>
                        </div>
                    })
                }
            </div>
        )
    }
}


export default Notification;
