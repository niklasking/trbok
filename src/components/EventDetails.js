import React from 'react';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import EventDiagram from './EventDiagram';
import EventMap from './EventMap';

//const backendBaseUrl = 'http://localhost:3333';
const backendBaseUrl = 'https://trbokbackend.niklasking.com';

class EventDetails extends React.Component {
    state = {
        loading: true,
        latlngData: [],
        heartrateData: [],
        altitudeData: [],
        velocityData: [],
        cadenceData: [],
        wattsData: []
    }
    componentDidMount = async () => {
        const url = backendBaseUrl + '/api/v1/activities/' + this.props.selectedEvent + '/details';
        const event = await axios.get(url);
//        console.log(event.data.latlngValues.data);

        if (event.data.latlngValues !== null) {
            this.setState({latlngData: event.data.latlngValues.data})
        }
        if (event.data.heartrateValues !== null) {
            this.setState({heartrateData: event.data.heartrateValues.data})
        }
        if (event.data.altitudeValues !== null) {
            this.setState({altitudeData: event.data.altitudeValues.data})
        }
        if (event.data.velocityValues !== null) {
            this.setState({velocityData: event.data.velocityValues.data})
        }
        if (event.data.cadenceValues !== null) {
            this.setState({cadenceData: event.data.cadenceValues.data})
        }
        if (event.data.wattsValues !== null) {
            this.setState({wattsData: event.data.wattsValues.data})
        }
        this.setState({loading: false});
    }

    render() {
        return <div>
                    {this.state.loading && <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress />&nbsp;&nbsp;Hämtar data. Vänligen vänta.</div>}
                    {this.state.latlngData.length > 0 && <EventMap data={this.state.latlngData}/>}
                    {this.state.heartrateData.length > 0 && <EventDiagram data={this.state.heartrateData} xAxisTitle="distans" yAxisTitle="puls"/>}
                    {this.state.altitudeData.length > 0 && <EventDiagram data={this.state.altitudeData} xAxisTitle="distans" yAxisTitle="höjd"/>}
                    {this.state.velocityData.length > 0 && <EventDiagram data={this.state.velocityData} xAxisTitle="distans" yAxisTitle="fart"/>}
                    {this.state.cadenceData.length > 0 && <EventDiagram data={this.state.cadenceData} xAxisTitle="distans" yAxisTitle="kadens"/>}
                    {this.state.wattsData.length > 0 && <EventDiagram data={this.state.wattsData} xAxisTitle="distans" yAxisTitle="effekt"/>}
                </div>
    }
}

export default EventDetails;