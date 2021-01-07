import React from 'react';
import Week from './Week';
import Month from './Month';

const Summary = props => {
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
                    dateStart={props.dateStart}
                    dateEnd={props.dateEnd}
                    user={props.user}
                    upDatePage={props.upDatePage}
                />
                </div>
            </div>
        );
    } else {
        return (
            <div className="ui grid">
                <div className="row">
                    <div className="ui primary button left floated column three wide" onClick={props.getEarlierMonth}>&lt;&lt; Tidigare</div>
                    <div className="ui primary button right floated column three wide" onClick={props.getLaterMonth}>Senare &gt;&gt;</div>
                </div>
                <div className="row">
                    <Month 
                        activities={props.activities} 
                        dateStart={props.dateStart}
                        dateEnd={props.dateEnd}
                        user={props.user}
                    />
                </div>
            </div>
        );
    }
}

export default Summary;