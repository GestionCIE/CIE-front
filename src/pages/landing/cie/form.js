import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import eventStatisticsApi  from '../../../api/common/eventStatistics';
import Http from './../../../api/http';

const http = new Http();
const apiEventS =  new eventStatisticsApi();

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class Attendance extends React.Component {
  state = {
    fullname: '',
    program: '',
    semester: '',
    relationship: '',
    email: '',
    phoneNumer: ''
  };
  regster = async () =>{
    const data = {...this.state, idEvent: this.props.idEvent};
    console.log("register");
    console.log(data);

    const response = await http.post('event/createAttendance', data);
    if(response.result == 'created'){
              
      const data_id = {
        type: 1,
        count: 1,
        id :  this.props.idEvent
      };

      const response_update =  await  http.post('event/updateEventStatistics', data_id);
      if(response_update.result == 'edited'){
         message.success("Te has inscrito al evento");
         this.props.closeModal();
      }
   }
  }

  onChangeData = (e)=>{
    console.log(e.target.name)
    this.setState({[e.target.name]: e.target.value});
  }

  onChangeSelect = (value) =>{
    this.setState({relationship: value});
  }

  render(){
    return (
      <React.Fragment>
        <Form {...layout}  className="form" name="control-hooks" >
          <Form.Item label="Nombre"
           rules={[{ required: true,},]}>
            <Input  name="fullname" onChange={this.onChangeData} />
          </Form.Item>
          <Form.Item
             label="Prog. Acádemico"
            rules={[{ required: false,},]}>
            <Input  name="program" onChange={this.onChangeData} />
          </Form.Item>
          <Form.Item
           label="Semestre actual"
            rules={[{  required: false, },]}>
            <Input  name="semester" onChange={this.onChangeData} />
          </Form.Item>
          <Form.Item
            name="relationship" label="Rel. Universidad"
            rules={[{ required: true, },]}>
            <Select placeholder="Selecciona una opción" allowClear onChange={this.onChangeSelect} >
              <Option value="graduate">Egresado</Option>
              <Option value="student">Estudiante</Option>
              <Option value="other">Otro</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.university !== currentValues.university }>
            {({ getFieldValue }) => getFieldValue("university") === "otro" ? (
                <Form.Item
                  name="customizeUniversity"
                  label="Customize University"
                  rules={[{ required: true,}, ]}>
                  <Input />
                </Form.Item>
                ) : null
            }
          </Form.Item>
          <Form.Item
            label="Compañia"
            rules={[{ required: false, },]}>
            <Input  name="company" onChange={this.onChangeData} />
          </Form.Item>
          <Form.Item
            label="E-mail"
            rules={[{required: true, },]}>
            <Input  name="email" onChange={this.onChangeData} />
          </Form.Item>
          <Form.Item
            label="Telefono"
            rules={[{required: true,},]}>
            <Input name="phoneNumer" onChange={this.onChangeData}/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button className="Form_button" type="primary" htmlType="submit" onClick={this.regster}>
              Aceptar
            </Button>
          </Form.Item>
        </Form>{" "}
        <React.Fragment />
      </React.Fragment>
    );
  }
}


export default Attendance;
