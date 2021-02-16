import React from 'react';
import axios from 'axios';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import EventDiagram from './EventDiagram';

//const backendBaseUrl = 'http://localhost:3333';
const backendBaseUrl = 'https://trbokbackend.niklasking.com';

class EventDetailsEvent extends React.Component {
    state = {
        heartrateData: [],
        altitudeData: [],
        velocitySmoothData: [],
        cadenceData: [],
        wattsData: []
    }

    componentDidMount = async () => {
        if (this.props.eventId === this.props.activeEventId) {
            const url = backendBaseUrl + '/api/v1/activities/' + this.props.eventId;
            const event = await axios.get(url);
            if (event.data.heartrateValues !== null) {
                this.setState({heartrateData: event.data.heartrateValues[0].data})
            }
            if (event.data.altitudeValues !== null) {
                this.setState({altitudeData: event.data.altitudeValues[0].data})
            }
            if (event.data.velocitySmoothValues !== null) {
                this.setState({velocitySmoothData: event.data.velocitySmoothValues[0].data})
            }
            if (event.data.cadenceValues !== null) {
                this.setState({cadenceData: event.data.cadenceValues[0].data})
            }
            if (event.data.wattsValues !== null) {
                this.setState({wattsData: event.data.wattsValues[0].data})
            }
        }
    }
    render() {
        if (this.props.eventId === this.props.activeEventId) {
            return <TableRow>
                <TableCell colSpan="13">
                    <EventDiagram data={this.state.heartrateData} xAxisTitle="distans" yAxisTitle="puls"/>
                    <EventDiagram data={this.state.altitudeData} xAxisTitle="distans" yAxisTitle="höjd"/>
                    <EventDiagram data={this.state.velocitySmoothData} xAxisTitle="distans" yAxisTitle="fart"/>
                    <EventDiagram data={this.state.cadenceData} xAxisTitle="distans" yAxisTitle="kadens"/>
                    <EventDiagram data={this.state.wattsData} xAxisTitle="distans" yAxisTitle="effekt"/>
                </TableCell>
            </TableRow>
        }
        return null;
    }
}

export default EventDetailsEvent;