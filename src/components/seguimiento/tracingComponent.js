import React from 'react';
import {Layout, Row, Col, Table, Switch, Menu, Checkbox} from 'antd';
import {ScheduleOutlined} from '@ant-design/icons';


const {SubMenu} = Menu
const {Content} = Layout;



class TracingComponent extends React.Component {
    
    state = {
        tracing: [],
        loading: false,
        data: []
    };

        
    reloadTable(id){  
        let tracing = [];
        const jsonid = {id: id};
        fetch('http://localhost:3005/tracing/getAttendance', {
          method: 'POST',
          body: JSON.stringify(jsonid),
          headers:{
              'Content-Type': 'application/json'
          }})
            .then(res=> res.json())
            .then((response)=>{
                console.log(response);
                for(let i=0; i < response.result.length; i++){
                    tracing.push(response.result[i]);
                }
                this.setState({tracing: tracing});
                
            });
    }

    getEvents(){
      let {data} = this.state
      fetch('http://localhost:3005/tracing/getEvents')
          .then(res=> res.json())
          .then((response)=>{
              console.log(response);
              for(let i=0; i < response.result.length; i++){
                  data.push(response.result[i]);
              }
              this.setState({data: data});
              
          });
  }

  componentDidMount(){
    this.getEvents();
 }

    changeTheme = value => {
      this.setState({
        theme: value ? 'dark' : 'light',
      });
    };
  
    handleClick = e => {
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
    };

    //---------------------------------------------
    handleTracing(recoder) {  
    const jsonTracing = {
      confirmedAssistance: 1,
      idattendance: recoder.idattendance
    }
      fetch('http://localhost:3005/tracing/updateAttendance', {
          method: 'POST',
          body: JSON.stringify(jsonTracing),
          headers:{
              'Content-Type': 'application/json'
          }})
    }
  
    render(){

      const columns = [
        {
          title: '',
          dataIndex: '',
          render: (text, recoder)=>( <Checkbox onClick={this.handleTracing.bind(this, recoder)}></Checkbox>)
      },
        {
            title: 'nombre',
            dataIndex: 'fullName'
        },
        {
            title: 'Relacion con la Universidad',
            dataIndex: 'relationshipUniversity'
        },
        {
            title: 'email',
            dataIndex: 'email'
        },
        {
            title: 'telefono',
            dataIndex: 'phoneNumber',
        }
      ];
        return(
            <Content>
                <Row>
                    <Col span={7} >
                    <Switch
              checked={this.state.theme === 'dark'}
              onChange={this.changeTheme}
              checkedChildren="Oscuro"
              unCheckedChildren="Claro"
            />
            <br />
            <br />
            <Menu
              theme={this.state.theme}
              onClick={this.handleClick}
              style={{ width: 256 }}
              defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <ScheduleOutlined />
                    <span>Eventos</span>
                  </span>
                }
              >
                {
                  this.state.data.map(evento =>{
                    return(
                    <Menu.Item key={evento.idEvents} onClick={this.reloadTable.bind(this, evento.idEvents)}>{evento.eventName}</Menu.Item>
                    );
                  })
                }
              </SubMenu>
            </Menu>
              </Col>
                <Col span={16} push={1}>
                    <Table  columns={columns} dataSource={this.state.tracing} ></Table>
                </Col>
              </Row>
            </Content>
        );
    }
}


export default TracingComponent;