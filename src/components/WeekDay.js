import React, { Fragment } from 'react';

import WeekEvent from './WeekEvent';

class WeekDay extends React.Component {

    render() {
        if (this.props.events.length === 0) {
            const eventsOfDay = [{_id: 0}];
            let eventData = {
                eventId: 0,
                key: 'empty_' + this.props.date,
                dateRowSpan: 1,
                date: this.props.date,
                plannedIsHidden: this.props.plannedIsHidden,
                name: '',
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
                path: 0,
                namePlanned: '',
                distancePlanned: 0,
                movingTimePlanned: 0,
                typePlanned: '',
                skada: this.props.days.length === 0 || this.props.days[0].skada === 0 ? 0: 1, 
                sjuk: this.props.days.length === 0 || this.props.days[0].sjuk === 0 ? 0: 1,
                hasStravaActivity: false,
                isStravaSynced: false,
                isStravaStreamsSynced: false
            };
            return (
                <WeekEvent eventsOfDay={eventsOfDay} setDetailsTab={this.props.setDetailsTab} dayDate={this.props.date} dayName={this.props.dayName} eventData={eventData} key={'weekEvent_' + eventData.key} user={this.props.user} upDatePage={this.props.upDatePage} performedIsHidden={this.props.performedIsHidden}/>
            )
        } else {
            let dayEvents = [];
            let eventData = {
                key: this.props.events[0]._id,
                dateRowSpan: this.props.events.length,
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
                path: this.props.events[0].path,
                namePlanned: this.props.events[0].namePlanned,
                distancePlanned: this.props.events[0].distancePlanned,
                movingTimePlanned: this.props.events[0].movingTimePlanned,
                typePlanned: this.props.events[0].typePlanned,
                skada: this.props.days.length === 0 || this.props.days[0].skada === 0 ? 0: 1, 
                sjuk: this.props.days.length === 0 || this.props.days[0].sjuk === 0 ? 0: 1,
                hasStravaActivity: this.props.events[0].hasStravaActivity,
                isStravaSynced: this.props.events[0].isStravaSynced,
                isStravaStreamsSynced: this.props.events[0].isStravaStreamsSynced
            };
            dayEvents.push(<WeekEvent eventsOfDay={this.props.events} setDetailsTab={this.props.setDetailsTab} dayDate={this.props.date} dayName={this.props.dayName} eventData={eventData} key={'weekEvent_' + eventData.key} user={this.props.user} upDatePage={this.props.upDatePage} performedIsHidden={this.props.performedIsHidden}/>);


            for (let i = 1; i < this.props.events.length; i++) {
                let eventData = {
                    key: this.props.events[i]._id,
                    dateRowSpan: 0,
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
                    path: this.props.events[i].path,
                    namePlanned: this.props.events[i].namePlanned,
                    distancePlanned: this.props.events[i].distancePlanned,
                    movingTimePlanned: this.props.events[i].movingTimePlanned,
                    typePlanned: this.props.events[i].typePlanned,
                    skada: this.props.days.length === 0 || this.props.days[0].skada === 0 ? 0: 1, 
                    sjuk: this.props.days.length === 0 || this.props.days[0].sjuk === 0 ? 0: 1,
                    hasStravaActivity: this.props.events[i].hasStravaActivity,
                    isStravaSynced: this.props.events[i].isStravaSynced,
                    isStravaStreamsSynced: this.props.events[i].isStravaStreamsSynced
                };
                dayEvents.push(<WeekEvent eventsOfDay={this.props.events} setDetailsTab={this.props.setDetailsTab} dayDate={this.props.date} dayName={this.props.dayName} eventData={eventData} key={'weekEvent_' + eventData.key} user={this.props.user} upDatePage={this.props.upDatePage} performedIsHidden={this.props.performedIsHidden}/>);
            }
            return <Fragment>{dayEvents}</Fragment>
        }
    }
}

export default WeekDay;