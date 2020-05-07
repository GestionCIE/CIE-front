import React, { Component } from "react";
import { Select, Avatar, Tooltip, Space } from "antd";
import { BellOutlined, SettingOutlined } from "@ant-design/icons";

const { Option } = Select;
class HeaderManagement extends Component {
  navRight = () => {
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
  render() {
    return (
      <div className="NavContainer">
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
              <span>Emprededores</span>
              {this.props.names.map((profile, index) => {
                return (
                  <Tooltip placement="top" title={profile.name}>
                    <Avatar>{profile.nameshort}</Avatar>
                  </Tooltip>
                );
              })}
              <span>Asesor</span>
              <Tooltip placement="top" title={this.props.advisor}>
                <Avatar>{this.props.advisor}</Avatar>
              </Tooltip>
            </Space>
          </div>
        </div>
        <this.navRight></this.navRight>
      </div>
    );
  }
}
export default HeaderManagement;
