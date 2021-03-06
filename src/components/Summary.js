import React from 'react';
import moment from 'moment';
import 'moment/locale/sv';
import Week from './Week';
import Month from './Month';
import Statistics from './Statistics';
import EventDetails from './EventDetails';

const Summary = props => {
    moment.locale('sv');
    if (props.selectedTab === 'week') {
        return (
            <div className="ui grid" style={{padding: 10}}>
                <div className="row">
                    <div className="ui primary button left floated column two wide" onClick={props.getEarlierWeek}>&lt;&lt; Tidigare</div>
                    <div className="ui primary button right floated column two wide" onClick={props.getLaterWeek}>Senare &gt;&gt;</div>
                </div>
                <div className="row">
                <Week 
                    activities={props.activities} 
                    setDetailsTab={props.setDetailsTab}
                    days={props.days}
                    dateStart={props.dateStart}
                    dateEnd={props.dateEnd}
                    user={props.user}
                    upDatePage={props.upDatePage}
                />
                </div>
            </div>
        );
    } else if (props.selectedTab === 'month') {
        return (
            <div className="ui grid" style={{padding: 10}}>
                <div className="row">
                    <div className="ui primary button left floated column two wide" onClick={props.getEarlierMonth}>&lt;&lt; Tidigare</div>
                    <div><h3>{moment(props.dateStart).format('MMMM YYYY').charAt(0).toUpperCase() + moment(props.dateStart).format('MMMM YYYY').slice(1)}</h3></div>
                    <div className="ui primary button right floated column two wide" onClick={props.getLaterMonth}>Senare &gt;&gt;</div>
                </div>
                <div className="row">
                    <Month 
                        activities={props.activities} 
                        days={props.days}
                        dateStart={props.dateStart}
                        dateEnd={props.dateEnd}
                        user={props.user}
                    />
                </div>
            </div>
        );
    } else if (props.selectedTab === 'stat') {
        return (
            <div className="row">
                <Statistics
                    activities={props.activities} 
                    dateStart={props.dateStart}
                    dateEnd={props.dateEnd}
                    user={props.user}
                />
            </div>
        )
    } else {
        // Träningar
        return (
            <div className="row">
                <EventDetails 
                    selectedEvent={props.selectedEvent}
                    user={props.user}
                />
            </div>
        );
    }
}

export default Summary;