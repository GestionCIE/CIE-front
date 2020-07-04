
import React from 'react';
import Http from './../../api/http';
import {Bar} from 'react-chartjs-2'
const http = new Http();

class stateOfActivivities extends React.Component {
    state = {
        data: [],
        labels : []
    };

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
        return(
            <Bar />
        )
    }
}

export default stateOfActivivities;