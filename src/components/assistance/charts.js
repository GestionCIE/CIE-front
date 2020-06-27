import React from 'react';
import {Bar, Pie}from 'react-chartjs-2';
import {Col, Row} from 'antd';
import Http from './../../api/http';

const http =  new Http();

class Charts extends React.Component {
    
    state = {
        labels: [],
        data: []
    }

    async getData(){
        const response = await http.get('event/getRegisteredByEvent');
        console.log(response);
        this.setState({
            labels : response.result.labels,
            data: response.result.data
        });
    }

    componentDidMount() {
        this.getData();
    }
    render(){
        const data = {
            labels: this.state.labels,
            datasets: [
              {
                label: 'Personal Registrado por evento',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.data
              }
            ]
          };
        return(<Row>
            <Col span={24}>
                <h6>Trazabilidad de eventos</h6>
                <div className="Content_Chart">
                    <Bar data={data}/>
                    <Pie data={data} />
                </div>
                
            </Col> 
        </Row>)
    }
}

export default Charts;