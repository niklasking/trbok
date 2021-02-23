import React from 'react';
import axios from 'axios';

import '../../node_modules/react-vis/dist/style.css';
import {XAxis, YAxis, HorizontalGridLines, LineSeries, FlexibleWidthXYPlot} from 'react-vis';

import CircularProgress from '@material-ui/core/CircularProgress';

//const backendBaseUrl = 'http://localhost:3333';
const backendBaseUrl = 'https://trbokbackend.niklasking.com';

class EventDiagram extends React.Component {
    state = {
        chartData: null
    }

    componentDidMount = async () => {
        const url = backendBaseUrl + '/api/v1/activities/' + this.props.eventId + '/details/' + this.props.type;
        const result = await axios.get(url);
        this.setState({ chartData: result });
    }
    render() {
        if (this.state.chartData === null) {
            return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress />&nbsp;&nbsp;Hämtar data. Vänligen vänta.</div>
        }
        return <FlexibleWidthXYPlot height={200}>
                    <LineSeries data={this.state.chartData.data.data} />
                    <XAxis title={this.props.xAxistTitle} />
                    <YAxis title={this.props.yAxisTitle}/>
                    <HorizontalGridLines />
                </FlexibleWidthXYPlot>
    }

}
export default EventDiagram;