import React, { Fragment } from 'react';

import MonthEvent from './MonthEvent';

class MonthDay extends React.Component {

    render() {
        const styles = {
            cell: {
                borderRight: '1px solid gray',
                padding: '5px'
            },
            dateCell: {
                borderRight: '1px solid gray',
                padding: '5px',
                width: '80px'
            },
            hiddenCell: {
                borderRight: '1px solid gray',
                padding: '0',
                width: '20px'
            }
        };

        if (this.props.events.length === 0) {
            let eventData = {
                key: 'empty_' + this.props.date,
                dateRowSpan: 1,
                isLastEvent: true,
                date: this.props.date,
                plannedIsHidden: this.props.plannedIsHidden,
                name: 'Vila',
                type: '',
                distance: 0,
                movingTime: 0,
                title: '',
                ol: 0,
                night: 0,
                quality: 0,
                lsd: 0,
                strength: 0,
                alternative: 0,
                forest: 0,
                path: 0
            };
            return (
                <MonthEvent dayDate={this.props.date} dayName={this.props.dayName} eventData={eventData} key={'weekEvent_' + eventData.key} user={this.props.user} upDatePage={this.props.upDatePage} performedIsHidden={this.props.performedIsHidden}/>
            )
        } else {
            let dayEvents = [];
            let eventData = {
                key: this.props.events[0]._id,
                dateRowSpan: this.props.events.length,
                isLastEvent: this.props.events.length === 1 ? true : false,
                date: this.props.date,
                plannedIsHidden: this.props.plannedIsHidden,
                name: this.props.events[0].name,
                type: this.props.events[0].type,
                distance: this.props.events[0].distance,
                movingTime: this.props.events[0].movingTime,
                title: this.props.events[0].title,
                ol: this.props.events[0].ol,
                night: this.props.events[0].night,
                quality: this.props.events[0].quality,
                lsd: this.props.events[0].lsd,
                strength: this.props.events[0].strength,
                alternative: this.props.events[0].alternative,
                forest: this.props.events[0].forest,
                path: this.props.events[0].path
            };
            dayEvents.push(<MonthEvent dayDate={this.props.date} dayName={this.props.dayName} eventData={eventData} key={'weekEvent_' + eventData.key} user={this.props.user} upDatePage={this.props.upDatePage} performedIsHidden={this.props.performedIsHidden}/>);


            for (let i = 1; i < this.props.events.length; i++) {
                let eventData = {
                    key: this.props.events[i]._id,
                    dateRowSpan: 0,
                    isLastEvent: i === this.props.events.length - 1 ? true: false,
                    date: this.props.date,
                    plannedIsHidden: this.props.plannedIsHidden,
                    name: this.props.events[i].name,
                    type: this.props.events[i].type,
                    distance: this.props.events[i].distance,
                    movingTime: this.props.events[i].movingTime,
                    title: this.props.events[i].title,
                    ol: this.props.events[i].ol,
                    night: this.props.events[i].night,
                    quality: this.props.events[i].quality,
                    lsd: this.props.events[i].lsd,
                    strength: this.props.events[i].strength,
                    alternative: this.props.events[i].alternative,
                    forest: this.props.events[i].forest,
                    path: this.props.events[i].path
                };
                dayEvents.push(<MonthEvent dayDate={this.props.date} dayName={this.props.dayName} eventData={eventData} key={'weekEvent_' + eventData.key} user={this.props.user} upDatePage={this.props.upDatePage} performedIsHidden={this.props.performedIsHidden}/>);
            }
            return <Fragment>{dayEvents}</Fragment>
        }
    }
}

export default MonthDay;