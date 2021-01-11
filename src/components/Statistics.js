import React from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import moment from 'moment';

//const backendBaseUrl = 'http://localhost:3333';
const backendBaseUrl = 'https://trbokbackend.niklasking.com';


class Statistics extends React.Component {
    state = {
        dateStart: moment().add(-1, "year").startOf("isoWeek").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
        dateEnd: moment().endOf("day").format('YYYY-MM-DD HH:mm:ss'),
        categories: [],
        seriesData: [],
        series: [{
            name: 'Tid per vecka',
            data: []
        }],
        options: {
            chart: {
                id: 'chart-week',
                zoom: {
                    enabled: true
                }
            },
            xaxis: {
                categories: [],
                tickPlacement: 'on'
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return moment.duration(value, "seconds").format("H:mm")
                    }
                },
            },
            dataLabels: {
                enabled: false
            },
            title: {
                text: 'Tid per vecka',
                floating: true,
                offsetY: 0,
                align: 'center',
                style: {
                    color: '#444'
                }
            }
        }
    }
    componentDidMount = async () => {
//        console.log(this.state.dateStart);
//        console.log(this.state.dateEnd);
        const url = backendBaseUrl + '/api/v1/summary/week?userStravaId=' + this.props.user.stravaId + 
                    '&dateStart=' + this.state.dateStart + '&dateEnd=' + this.state.dateEnd;
        const response = await axios.get(url);
        let categories = [];
        let seriesData = [];
        for (let i = 0; i < response.data.length; i++) {
            categories.push(response.data[i]._id.year + '-' +response.data[i]._id.week);
//            seriesData.push(moment.duration(response.data[i].sumTime, "seconds").format("H:mm"));
            seriesData.push(response.data[i].sumTime);
        }
        this.setState({categories: categories});
        this.setState({seriesData: seriesData});
        this.setState({
            series: [{
                name: 'Tid per vecka',
                data: seriesData
              }]                
        });
        this.setState({
            options: {
                chart: {
                    id: 'chart-week',
                    zoom: {
                        enabled: true
                    }
                },
                xaxis: {
                    categories: categories,
                    tickPlacement: 'on'
                },
                yaxis: {
                    labels: {
                        formatter: function (value) {
                            return moment.duration(value, "seconds").format("H:mm")
                        }
                    },
                },
                dataLabels: {
                    enabled: false
                },
                title: {
                    text: 'Tid per vecka',
                    floating: true,
                    offsetY: 0,
                    align: 'center',
                    style: {
                        color: '#444'
                    }
                }
            }    
        });

    }
    render() {
        return (
            <div>
                <Chart options={this.state.options} series={this.state.series} type="bar" height={400} />
            </div>
        );
    }
}

export default Statistics;