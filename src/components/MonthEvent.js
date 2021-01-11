import React from 'react';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import DirectionsBikeOutlinedIcon from '@material-ui/icons/DirectionsBikeOutlined';
import PoolIcon from '@material-ui/icons/Pool';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import NightsStayIcon from '@material-ui/icons/NightsStay';

momentDurationFormatSetup(moment);

function getDistance(distance) {
    if (distance === 0) {
        return ""
    }
    if (distance < 1000) {
        return distance + " m"
    }
    return Math.round(distance*100/1000)/100 + " km";
}
function getTime(time) {
    if (time === 0) {
        return '';
    }
    return moment.duration(time, "seconds").format("H:mm");
}
function getTypeIcon(type) {
    switch (type) {
        case 'ol':
            return <img src={process.env.PUBLIC_URL + '/olskarm.png'} alt="OL" height={16} width={16} style={{border: "solid black 1px"}}/>
        case 'night':
            return <NightsStayIcon/>
        case 'Run':
            return <DirectionsRunOutlinedIcon/>
        case 'WeightTraining':
            return <FitnessCenterOutlinedIcon/>
        case 'Workout':
            return <AccessibilityNewIcon/>
        case 'Ride':
        case 'VirtualRide':
            return <DirectionsBikeOutlinedIcon/>
        case 'Swim':
            return <PoolIcon/>
        case 'Walk':
            return <DirectionsWalkIcon/>
        case 'Rowing':
        case 'Kayaking':
            return <img src={process.env.PUBLIC_URL + '/kayak.png'} alt="Kayak" height={16} width={16} />
        case 'NordicSki':
        case 'RollerSki':
            return <img src={process.env.PUBLIC_URL + '/ski.png'} alt="Ski" height={16} width={16} />
        default:
            return type;
    }
}

class MonthEvent extends React.Component {
    state = { 
        name: '',
        movingTime: 0,
        distance: 0,
        type: '',
        ol: false,
        night: false,
        quality: false,
        lsd: false,
        strength: false,
        alternative: false,
        forest: false,
        path: false
}

    componentDidMount() {
        this.setState({movingTime: getTime(this.props.eventData.movingTime)});
        this.setState({distance: Math.round(this.props.eventData.distance*100/1000)/100});
        this.setState({type: this.props.eventData.type});
        this.setState({ol: this.props.eventData.ol === 1 ? true : false});
        this.setState({night: this.props.eventData.night === 1 ? true : false});
        this.setState({quality: this.props.eventData.quality === 1 ? true : false});
        this.setState({lsd: this.props.eventData.lsd === 1 ? true : false});
        this.setState({strength: this.props.eventData.strength === 1 ? true : false});
        this.setState({alternative: this.props.eventData.alternative === 1 ? true : false});
        this.setState({forest: this.props.eventData.forest === 1 ? true : false});
        this.setState({path: this.props.eventData.path === 1 ? true : false});
    }
    render() {
        const styles = {
            cell: {
                borderRight: '1px solid gray',
                padding: '5px'
            },
            smallCell: {
                borderRight: '1px solid gray',
                padding: '2px',
                width: '30px'
            },
            dataCell: {
                borderRight: '1px solid gray',
                padding: '5px',
                width: '80px'
            },
            dateCell: {
                borderRight: '1px solid gray',
                padding: '5px',
                width: '80px',
                backgroundColor: 'lightGray'
            },
            hiddenCell: {
                borderRight: '1px solid gray',
                padding: '0',
                width: '20px'
            },
            checkbox: {
                width: '16px',
                height: '16px'
            }
        };

        return (
            <TableRow key={this.props.eventData.key}>
                {this.props.eventData.dateRowSpan > 0 && <TableCell rowSpan={this.props.eventData.dateRowSpan} style={styles.dateCell} align="left">
                    {this.props.eventData.date}</TableCell>}

                {this.props.eventData.plannedIsHidden && <TableCell style={styles.hiddenCell}></TableCell>}
                {!this.props.eventData.plannedIsHidden && <TableCell colSpan="4" style={styles.cell}></TableCell>}

                {!this.props.performedIsHidden && <TableCell style={styles.cell}>{this.props.eventData.name}</TableCell>}
                {!this.props.performedIsHidden && <TableCell align="center" style={styles.cell}>{getTypeIcon(this.props.eventData.type)}</TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.ol === 1 && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.ol === 0 && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.night === 1 && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.night === 0 && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.quality === 1 && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.quality === 0 && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.lsd === 1 && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.lsd === 0 && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.strength === 1 && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.strength === 0 && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.alternative === 1 && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.alternative === 0 && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.forest === 1 && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.forest === 0 && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.path === 1 && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {!this.props.performedIsHidden && this.props.eventData.path === 0 && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {!this.props.performedIsHidden && <TableCell align="right" style={styles.cell}>{getDistance(this.props.eventData.distance)}</TableCell>}
                {!this.props.performedIsHidden && <TableCell align="right" style={styles.cell}>{getTime(this.props.eventData.movingTime)}</TableCell>}
                
                {this.props.performedIsHidden && <TableCell style={styles.cell} colSpan="12"></TableCell>}

            </TableRow>
        );
    }
}

export default MonthEvent;
