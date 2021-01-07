import React from 'react';
import moment from 'moment';

import WeekDay from './WeekDay';


const Month = props => {
    if (props.user === null) {
        return <div></div>
    }
//    console.log(props.activities);

    let dateToPrint = moment(props.dateStart);
    let lastDate = moment(props.dateEnd);
    let days = [];
  
    while (lastDate.isSameOrAfter(dateToPrint, 'day')) {
        const events = props.activities.filter( (event) => moment(event.startDate).isSame(dateToPrint, 'day') );
        days.push(<WeekDay key={dateToPrint} date={dateToPrint.format('YYYY-MM-DD')} events={events}/>);
        dateToPrint.add(1, 'd');
    }
    return (
        <div>
            {days}
        </div>
    )
}

export default Month;