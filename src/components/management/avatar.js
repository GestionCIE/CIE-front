import React from "react";
import { Avatar, Tooltip } from "antd";

class AvatarComponent extends React.Component {
  state = {
    avatars: [],
  };

  componentDidMount() {
    const {profiles} = this.props;

    const data = [];
    for (let i = 0; i < profiles.length; i++) {
      data.push({
        nameshort: profiles[i].nameshort,
        responsable: profiles[i].responsable,
      });
    }
    this.setState({ avatars: data });
  }

  render() {
    return (
      <div>
        {this.state.avatars.map((data, index) => {
          return (
            <Tooltip placement="top" title={data.responsable}>
              <Avatar>{data.nameshort}</Avatar>
            </Tooltip>
          );
        })}
      </div>
    );
  }
}

export default AvatarComponent;
