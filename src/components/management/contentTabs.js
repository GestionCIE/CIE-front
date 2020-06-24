import React from 'react';
import {Table} from 'antd';

class ContentTabs extends React.Component{

    constructor(){
        super();
        this.showDetailRow = this.showDetailRow.bind(this);
    }

    showDetailRow = (recoder) =>{
        this.props.showDrawel(recoder);
    }

    componentDidMount(){
        console.log("ContentTabs");
        this.props.getActivities();
    }
    render(){
        return(    
        <Table
            columns={this.props.columns}
            pagination={false}
            dataSource={this.props.dataSource}
            // scroll={{ x: 1200 }}
            onRow={(recoder)=>{
              return {
                onClick: this.showDetailRow.bind(this, recoder)
              }
            }}
          />);
    }
}

export default ContentTabs;