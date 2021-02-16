import React from 'react';

import Chart from 'chart.js';
//import '../../node_modules/react-vis/dist/style.css';
//import {XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, FlexibleWidthXYPlot} from 'react-vis';

class EventDiagram extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            data: this.props.data
        });
    }

    render() {
//        if (this.props.data.length === 0) {
//            return null
//        }
        return (
            <canvas ref={this.chartRef} />
        );
    }
}
export default EventDiagram;