import React, { Component } from "react";
import { Select, Avatar, Tooltip, Space } from "antd";
import { BellOutlined, SettingOutlined } from "@ant-design/icons";

const { Option } = Select;
class HeaderManagement extends Component {

  state = {
    names:[],
    advisor: ''
  };

  onChangeGetProfiles = (value) => {
    console.log("onchange profile", value);
    if (value > 0) {
      this.getParticipants(value);
      this.props.handerProject(value);
    }
  };

  getParticipants(id) {
    fetch(`http://localhost:3005/project/getParticipans?id=${id}`)
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          names: response.result.entrepreneurs,
          advisor: response.result.advisor,
        });
      });
  }

  render() {
    return (
      <>
        <div className="NavLeft">
          <Select
            defaultValue="Selecione Un Proyecto"
            style={{ marginLeft: "10px" }}
            onChange={this.onChangeGetProfiles}
          >
            {this.props.projects.length > 0 ? (
              this.props.projects.map((project, index) => {
                return (
                  <Option value={project.idProject}>
                    {project.projectName}
                  </Option>
                );
              })
            ) : (
              <Option value="-1">No hay Projectos</Option>
            )}
          </Select>

          <div className="div-avatar">
            <Space size={8}>
              {this.state.names.map((profile, index) => {
                return (
                  <Tooltip placement="top" title={profile.name}>
                    <Avatar>{profile.nameshort}</Avatar>
                  </Tooltip>
                );
              })}
                {
                  this.state.advisor != '' ?  <> <span>Asesor</span> 
                  <Tooltip placement="top" title={this.state.advisor} >
                      <Avatar >{this.state.advisor}</Avatar>
                  </Tooltip> </>: null
                  }
            </Space>
          </div>
        </div>
        <NavRight></NavRight>
      </>
    );
  }
}
export default HeaderManagement;

export const NavRight = () => {
  return (
    <div className="NavRight">
      <div className="NavRight__Settings">
        <SettingOutlined className="icon" style={{ fontSize: "20px" }} />
      </div>
      <div className="NavRight__Notif">
        <BellOutlined className="icon" style={{ fontSize: "20px" }} />
      </div>
    </div>
  );
};
