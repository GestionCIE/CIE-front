import React from 'react';
import {Avatar} from 'antd';
import './index.css';
import user from '../../assets/img/man.svg'

class Profile extends React.Component{

    state = {
        username: '',
        role: '',

    };
    
    getDataProfile(){
        console.log(localStorage.getItem('username'));
        this.setState({
            username: localStorage.getItem('username'),
            role: localStorage.getItem('role')
        })
    }

    componentDidMount(){
        this.getDataProfile();
    }

    render(){
        return(
            <div className="profile">   
                <Avatar size={40} src={ (this.props.avatar !== "") ? this.props.avatar :user} style={{top: '5%'}}/>
                <span className="profile-text">{this.state.username}</span>
                <span className="profile-text">{this.state.role}</span> 
            </div>
        );        
    }
}

export default Profile;
