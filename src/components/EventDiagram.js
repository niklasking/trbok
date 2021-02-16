import React from 'react';

import '../../node_modules/react-vis/dist/style.css';
import {XAxis, YAxis, HorizontalGridLines, LineSeries, FlexibleWidthXYPlot} from 'react-vis';

class EventDiagram extends React.Component {

    render() {
        if (this.props.data.length === 0) {
            return null
        }
        return <FlexibleWidthXYPlot height={200}>
                    <LineSeries data={this.props.data} />
                    <XAxis title={this.props.xAxistTitle} />
                    <YAxis title={this.props.yAxisTitle}/>
                    <HorizontalGridLines />
                </FlexibleWidthXYPlot>
    }
}
export default EventDiagram;