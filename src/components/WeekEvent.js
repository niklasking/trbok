import React from 'react';
import axios from 'axios';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
//import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import DirectionsBikeOutlinedIcon from '@material-ui/icons/DirectionsBikeOutlined';
import PoolIcon from '@material-ui/icons/Pool';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import NightsStayIcon from '@material-ui/icons/NightsStay';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

import EditEventDialog from './EditEventDialog';
import AddNewEventDialog from './AddNewEventDialog';
import { Cancel } from '@material-ui/icons';

  //const backendBaseUrl = 'http://localhost:3333';
  const backendBaseUrl = 'https://trbokbackend.niklasking.com';

momentDurationFormatSetup(moment);

function getDistanceEdit(distance) {
    if (distance === 0) {
        return ""
    }
    if (distance === '') {
        return ""
    }
    if (distance === "0") {
        return ""
    }
    if (distance < 1000) {
        return distance;
    }
    return Math.round(distance*100/1000)/100;
}
function getDistance(distance) {
    if (distance === 0) {
        return ""
    }
    if (distance === undefined) {
        return ""
    }
    if (distance === '') {
        return ""
    }
    if (distance === "0") {
        return ""
    }
    if (distance < 1000) {
        return distance + " m"
    }
    return Math.round(distance*100/1000)/100 + " km";
}
function getTime(time) {
    if (time === undefined || time === null) {
        return '';
    }
    if (time === '') {
        return '';
    }
    if (time === 0) {
        return '';
    }
    if (time === "0") {
        return '';
    }
    return moment.duration(time, "seconds").format("H:mm");
}
function getSeconds(time) {
    let separator = '';
    if (time.indexOf(':') > 0) {
        separator = ':';
    } else if (time.indexOf('.') > 0) {
        separator = '.';
    } else if (time.indexOf(',') > 0) {
        separator = ',';
    }
    if (separator !== '') {
        let parts = time.split(separator);
        return parseInt(parts[0]) * 60 * 60 + parseInt(parts[1]) * 60;
    } else {
        return parseInt(time)*60;
    }
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

class WeekEvent extends React.Component {
    state = { 
//        isEditMode: false,
        isEditing: false,
        isAdding: false,
        name: '',
        movingTime: "0",
        distance: 0,
        type: '',
        ol: false,
        night: false,
        quality: false,
        lsd: false,
        strength: false,
        alternative: false,
        forest: false,
        path: false,
        skada: false,
        sjuk: false,
        openEditEventDialog: false,
        openDeleteWarningDialog: false,
        namePlanned: '',
        distancePlanned: 0,
        movingTimePlanned: "0",
        typePlanned: ''
}

    getStravaEventOneDay = async () => {

        const after = moment(this.props.dayDate + " 00:00:00").unix();
        const before = moment(this.props.dayDate + " 23:59:59").unix();
        const url = backendBaseUrl + '/api/v1/strava/activities/between' +
                    '?before=' + before + '&after=' + after +
                    '&stravaId=' + this.props.user.stravaId;
        
        await axios.get(url);
        this.props.upDatePage();
    }

    // ***** EDIT EVENT DIALOG *******
    handleCloseEditEventDialog = (value) => {
        this.setState({openEditEventDialog: false});
        switch (value) {
            case 'editEvent':
                this.setState({isEditing: true});
                break;
            case 'addEvent':
                if (this.props.eventData.key.startsWith('empty_')) {
                    this.setState({isEditing: true});
                } else {
                    this.setState({isAdding: true});
                }
                break;
            case 'deleteEvent':
                this.setState({openDeleteWarningDialog: true});
                break;
            case 'strava':
                this.getStravaEventOneDay();
                break;
            case 'isSkadad':
                this.setState({skada: true});
                this.saveDay(true, this.state.sjuk);
                break;
            case 'isNotSkadad':
                this.setState({skada: false});
                this.saveDay(false, this.state.sjuk);
                break;
            case 'isSjuk':
                this.setState({sjuk: true});
                this.saveDay(this.state.skada, true);
                break;
            case 'isNotSjuk':
                this.setState({sjuk: false});
                this.saveDay(this.state.skada, false);
                break;
            default:
        }
    };
    // *******************************

    handleCloseDeleteWarningDialogOk = async () => {
        this.setState({openDeleteWarningDialog: false});

        const url = backendBaseUrl + '/api/v1/activities/' + this.props.eventData.key;
        await axios.delete(url);
        this.props.upDatePage();
    }
    handleCloseDeleteWarningDialogNok = () => {
        this.setState({openDeleteWarningDialog: false});
    }

    setEditMode = () => {
//        this.setState({name: this.props.eventData.name});
            this.setState({openEditEventDialog: true});
    }
    handleAddEventClose = async (result) => {
        this.setState({isAdding: false});
        if (result.item.saveStatus) {
            const night = result.item.type === 'night' ? 1 : result.item.night;
            const event = {
                startDate: this.props.dayDate,
                user: this.props.user,
                name: result.item.name,
                distance: result.item.distance * 1000,
                movingTime: getSeconds(result.item.movingTime),
                type: result.item.type,
                ol: result.item.ol,
                night: night,
                quality: result.item.quality,
                lsd: result.item.lsd,
                strength: result.item.strength,
                alternative: result.item.alternative,
                forest: result.item.forest,
                path: result.item.path,
                typePlanned: result.item.typePlanned,
                movingTimePlanned: getSeconds(result.item.movingTimePlanned),
                distancePlanned: result.item.distancePlanned * 1000,    
                namePlanned: result.item.namePlanned
            }
            const url = backendBaseUrl + '/api/v1/activities';
            await axios.post(url, event);
        } 
        this.props.upDatePage();
    }
    cancelEditMode = () => {
        this.setState({isEditing: false});
        this.props.upDatePage();
    }
    saveDay = async (skada, sjuk) => {
        const day = {
                startDate: this.props.dayDate,
                skada: skada,
                sjuk: sjuk,
                user: this.props.user
        };

        const url = backendBaseUrl + '/api/v1/days';
        await axios.post(url, day);

        this.setState({isEditMode: false});
        this.setState({isEditing: false});
        this.setState({isAdding: false});
        this.props.upDatePage();
    }
    saveEvent = async () => {
        if (this.validatePlannedDistance()) {
            // true betyder att detta fält INTE är ok.
            return
        }
        if (this.validatePlannedMovingTime()) {
            // true betyder att detta fält INTE är ok.
            return
        }
        if (this.validateDistance()) {
            // true betyder att detta fält INTE är ok.
            return
        }
        if (this.validateMovingTime()) {
            // true betyder att detta fält INTE är ok.
            return
        }
        const day = {
                startDate: this.props.dayDate,
                skada: this.state.skada,
                sjuk: this.state.sjuk,
                user: this.props.user
        };

        const url = backendBaseUrl + '/api/v1/days';
        await axios.post(url, day);

        if (this.props.eventData.key.startsWith('empty_')) {
            // New event
            const night = this.state.type === 'night' ? 1 : this.state.night;
            const event = {
                startDate: this.props.dayDate,
                _id: this.props.eventData.key,
                date: this.props.eventData.date,
                user: this.props.user,
                name: this.state.name,
                distance: this.state.distance >= 500 ? this.state.distance : this.state.distance * 1000,
                movingTime: getSeconds(this.state.movingTime),
                type: this.state.type,
                ol: this.state.ol,
                night: night,
                quality: this.state.quality,
                lsd: this.state.lsd,
                strength: this.state.strength,
                alternative: this.state.alternative,
                forest: this.state.forest,
                path: this.state.path,
                distancePlanned: this.state.distancePlanned >= 500 ? this.state.distancePlanned : this.state.distancePlanned * 1000,
                movingTimePlanned: getSeconds(this.state.movingTimePlanned),
                typePlanned: this.state.typePlanned,
                namePlanned: this.state.namePlanned
            }
            const url = backendBaseUrl + '/api/v1/activities';
            await axios.post(url, event);
        } else {
            // Existing event
            const ol = this.state.type === 'ol'|| this.state.type === 'night' ? 1 : this.state.ol;
            const night = this.state.type === 'night' ? 1 : this.state.night;
            const event = {
                _id: this.props.eventData.key,
                date: this.props.eventData.date,
                user: this.props.user,
                name: this.state.name,
                distance: this.state.distance >= 500 ? this.state.distance : this.state.distance * 1000,
                movingTime: getSeconds(this.state.movingTime),
                type: this.state.type,
                ol: ol,
                night: night,
                quality: this.state.quality,
                lsd: this.state.lsd,
                strength: this.state.strength,
                alternative: this.state.alternative,
                forest: this.state.forest,
                path: this.state.path,
                distancePlanned: this.state.distancePlanned >= 500 ? this.state.distancePlanned : this.state.distancePlanned * 1000,
                movingTimePlanned: getSeconds(this.state.movingTimePlanned),
                typePlanned: this.state.typePlanned,
                namePlanned: this.state.namePlanned
            }
            const url = backendBaseUrl + '/api/v1/activities';
            await axios.patch(url, event);
        }
        this.setState({isEditMode: false});
        this.setState({isEditing: false});
        this.setState({isAdding: false});
        this.props.upDatePage();
    }

    validatePlannedDistance = () => {
        return isNaN(this.state.distancePlanned);
    }
    correctPlannedDistance = (event) => {
        this.setState({ distancePlanned: event.target.value.replace(/[^\d.-]/g, '') });
    }
    validatePlannedMovingTime = () => {
        const re = /^(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$)|(^[0-9]*$)/;
        if (this.state.movingTimePlanned.toString().match(re)) {
            return false;
        } else {
            return true;
        }
    }
    correctPlannedMovingTime = (event) => {
        this.setState({ movingTimePlanned: event.target.value.replace(/[^\d:]/g, '') });
    }

    validateDistance = () => {
        return isNaN(this.state.distance);
    }
    correctDistance = (event) => {
        this.setState({ distance: event.target.value.replace(/[^\d.-]/g, '') });
    }
    validateMovingTime = () => {
        const re = /^(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$)|(^[0-9]*$)/;
        if (this.state.movingTime.toString().match(re)) {
            return false;
        } else {
            return true;
        }
    }
    correctMovingTime = (event) => {
        this.setState({ movingTime: event.target.value.replace(/[^\d:]/g, '') });
    }

    componentDidMount() {
        this.setState({name: this.props.eventData.name === null ? '' : this.props.eventData.name});
        this.setState({movingTime: getTime(this.props.eventData.movingTime)});
        this.setState({distance: this.props.eventData.distance});
        this.setState({type: this.props.eventData.type});
        this.setState({ol: this.props.eventData.ol === 1 ? true : false});
        this.setState({night: this.props.eventData.night === 1 ? true : false});
        this.setState({quality: this.props.eventData.quality === 1 ? true : false});
        this.setState({lsd: this.props.eventData.lsd === 1 ? true : false});
        this.setState({strength: this.props.eventData.strength === 1 ? true : false});
        this.setState({alternative: this.props.eventData.alternative === 1 ? true : false});
        this.setState({forest: this.props.eventData.forest === 1 ? true : false});
        this.setState({path: this.props.eventData.path === 1 ? true : false});
        this.setState({skada: this.props.eventData.skada === 1 ? true : false});
        this.setState({sjuk: this.props.eventData.sjuk === 1 ? true : false});
        this.setState({movingTimePlanned: (this.props.eventData.movingTimePlanned === null || this.props.eventData.movingTimePlanned === undefined) ? '' : getTime(this.props.eventData.movingTimePlanned)});
        this.setState({distancePlanned: (this.props.eventData.distancePlanned === null || this.props.eventData.distancePlanned === undefined) ? '' : this.props.eventData.distancePlanned});
        this.setState({typePlanned: this.props.eventData.typePlanned === null ? '' : this.props.eventData.typePlanned});
        this.setState({namePlanned: this.props.eventData.namePlanned === null ? '' : this.props.eventData.namePlanned});
    }
    render() {
        const styles = {
            cell: {
                borderRight: '1px solid gray',
                padding: '5px'
            },
            smallCell: {
                borderRight: '1px solid gray',
                textAlign: 'center',
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
            editCell: {
                borderRight: '1px solid gray',
                padding: '0',
                width: '20px'
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
                {!(this.state.isEditing) && <TableCell style={styles.editCell} align="center">
                        <MoreHorizIcon onClick={this.setEditMode}/>
                    </TableCell>}
                {this.props.eventData.key.startsWith('empty_') && <EditEventDialog open={this.state.openEditEventDialog} onClose={this.handleCloseEditEventDialog} emptyDay={true} skada={this.state.skada} sjuk={this.state.sjuk} isFirstEvent={this.props.eventData.dateRowSpan > 0 ? true : false}/>}
                {!this.props.eventData.key.startsWith('empty_') && <EditEventDialog open={this.state.openEditEventDialog} onClose={this.handleCloseEditEventDialog} emptyDay={false} skada={this.state.skada} sjuk={this.state.sjuk} isFirstEvent={this.props.eventData.dateRowSpan > 0 ? true : false}/>}
                <Dialog
                    open={this.state.openDeleteWarningDialog}
                    onClose={this.handleCloseDeleteWarningDialogNok}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Ta bort aktivitet?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Är du säkert på att du vill ta bort aktivitet:<br/>
                        {this.props.dayDate} - {this.props.eventData.name}?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleCloseDeleteWarningDialogOk} color="primary" startIcon={<DeleteIcon/>}>
                        Ja
                    </Button>
                    <Button onClick={this.handleCloseDeleteWarningDialogNok} color="primary" autoFocus startIcon={<Cancel/>}>
                        Nej
                    </Button>
                    </DialogActions>
                </Dialog>
                {this.state.isAdding && <AddNewEventDialog handleAddEventClose={this.handleAddEventClose} open={this.state.isAdding} dayDate={this.props.dayDate} />}

                {this.state.isEditing && <TableCell style={styles.editCell} align="center">
                        <DoneIcon onClick={this.saveEvent}/>
                        <RevertIcon onClick={this.cancelEditMode}/>
                    </TableCell>}

                {this.props.eventData.dateRowSpan > 0 && <TableCell rowSpan={this.props.eventData.dateRowSpan} style={styles.dateCell} align="left">
                    {this.props.dayName}<br/>{this.props.eventData.date}</TableCell>}

                {this.props.eventData.plannedIsHidden && <TableCell style={styles.hiddenCell}></TableCell>}
                {(!this.state.isEditing && !this.props.eventData.plannedIsHidden) && <TableCell style={styles.cell}>{this.props.eventData.namePlanned}</TableCell>}
                {(!this.state.isEditing && !this.props.eventData.plannedIsHidden) && <TableCell style={styles.smallCell}>{getTypeIcon(this.props.eventData.typePlanned)}</TableCell>}
                {(!this.state.isEditing && !this.props.eventData.plannedIsHidden) && <TableCell align="right" style={styles.cell}>{getDistance(this.props.eventData.distancePlanned)}</TableCell>}
                {(!this.state.isEditing && !this.props.eventData.plannedIsHidden) && <TableCell align="right" style={styles.cell}>{getTime(this.props.eventData.movingTimePlanned)}</TableCell>}

                {(this.state.isEditing && !this.props.eventData.plannedIsHidden) && <TableCell style={styles.cell}><TextField variant="outlined" multiline={true} fullWidth={true} rows={3} value={this.state.namePlanned} onChange={(e) => this.setState({ namePlanned: e.target.value })} name="namePlannedField"/></TableCell>}
                {(this.state.isEditing && !this.props.eventData.plannedIsHidden) && <TableCell style={styles.cell}>
                    <Select defaultValue={this.props.eventData.typePlanned === undefined ? '' : this.props.eventData.typePlanned} onChange={(e) => this.setState({ typePlanned: e.target.value })}>
                        <MenuItem value="ol"><img src={process.env.PUBLIC_URL + '/olskarm.png'} alt="OL" height={16} width={16}/><span>OL</span></MenuItem>
                        <MenuItem value="night"><NightsStayIcon/><span>Natt-OL</span></MenuItem>
                        <MenuItem value="Run"><DirectionsRunOutlinedIcon/><span>Löpning</span></MenuItem>
                        <MenuItem value="Ride"><DirectionsBikeOutlinedIcon/><span>Cykel</span></MenuItem>
                        <MenuItem value="VirtualRide"><DirectionsBikeOutlinedIcon/><span>Cykel inne</span></MenuItem>
                        <MenuItem value="WeightTraining"><FitnessCenterOutlinedIcon/><span>Styrketräning</span></MenuItem>
                        <MenuItem value="Swim"><PoolIcon/><span>Simning</span></MenuItem>
                        <MenuItem value="Workout"><AccessibilityNewIcon/><span>Annat</span></MenuItem>
                        <MenuItem value="NordicSki"><img src={process.env.PUBLIC_URL + '/ski.png'} alt="Ski" height={16} width={16}/><span>Skidor</span></MenuItem>
                        <MenuItem value="RollerSki"><img src={process.env.PUBLIC_URL + '/ski.png'} alt="Rullskidor" height={16} width={16}/><span>Rullskidor</span></MenuItem>
                        <MenuItem value="Kayaking"><img src={process.env.PUBLIC_URL + '/kayak.png'} alt="Kayak" height={16} width={16}/><span>Kajak</span></MenuItem>
                        <MenuItem value="Walk"><DirectionsWalkIcon/><span>Gång</span></MenuItem>
                        </Select>
                    </TableCell>}
                {(this.state.isEditing && !this.props.eventData.plannedIsHidden) && <TableCell style={styles.dataCell}><TextField variant="outlined" fullWidth={true} value={getDistanceEdit(this.state.distancePlanned)} onChange={this.correctPlannedDistance} error={this.validatePlannedDistance()} helperText={this.validatePlannedDistance() ? 'Fel' : ' '}/></TableCell>}
                {(this.state.isEditing && !this.props.eventData.plannedIsHidden) && <TableCell style={styles.dataCell}><TextField variant="outlined" fullWidth={true} value={this.state.movingTimePlanned} onChange={this.correctPlannedMovingTime} error={this.validatePlannedMovingTime()} helperText={this.validatePlannedMovingTime() ? 'Fel' : ' '}/></TableCell>}


                {(!this.state.isEditing && !this.props.performedIsHidden) && <TableCell style={styles.cell}>{this.props.eventData.name}</TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.state.type === '') && <TableCell align="center" style={styles.cell}>&nbsp;</TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.state.type !== '') && <TableCell align="center" style={styles.cell}>{getTypeIcon(this.props.eventData.type)}</TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.ol === 1) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.ol === 0) && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.night === 1) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.night === 0) && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.quality === 1) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.quality === 0) && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.lsd === 1) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.lsd === 0) && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.strength === 1) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.strength === 0) && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.alternative === 1) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.alternative === 0) && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.forest === 1) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.forest === 0) && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.path === 1) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.path === 0) && <TableCell align="center" style={styles.smallCell}>&nbsp;</TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden) && <TableCell align="right" style={styles.cell}>{getDistance(this.props.eventData.distance)}</TableCell>}
                {(!this.state.isEditing && !this.props.performedIsHidden) && <TableCell align="right" style={styles.cell}>{getTime(this.props.eventData.movingTime)}</TableCell>}

                {(this.props.eventData.dateRowSpan > 0 && !this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.skada === 1) && <TableCell rowSpan={this.props.eventData.dateRowSpan} style={styles.smallCell} align="left"><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {(this.props.eventData.dateRowSpan > 0 && !this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.skada === 0) && <TableCell rowSpan={this.props.eventData.dateRowSpan} style={styles.smallCell} align="left">&nbsp;</TableCell>}
                {(this.props.eventData.dateRowSpan > 0 && !this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.sjuk === 1) && <TableCell rowSpan={this.props.eventData.dateRowSpan} style={styles.smallCell} align="left"><Checkbox checked={true} disabled style={styles.checkbox}/></TableCell>}
                {(this.props.eventData.dateRowSpan > 0 && !this.state.isEditing && !this.props.performedIsHidden && this.props.eventData.sjuk === 0) && <TableCell rowSpan={this.props.eventData.dateRowSpan} style={styles.smallCell} align="left">&nbsp;</TableCell>}
                
                {this.props.performedIsHidden && <TableCell style={styles.cell} colSpan="14"></TableCell>}

                {(this.state.isEditing && !this.props.performedIsHidden) && <TableCell style={styles.cell}><TextField variant="outlined" multiline={true} fullWidth={true} rows={3} value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} name="nameField"/></TableCell>}
                {(this.state.isEditing && !this.props.performedIsHidden) && <TableCell style={styles.cell}>
                    <Select defaultValue={this.props.eventData.type === undefined ? '' : this.props.eventData.type} onChange={(e) => this.setState({ type: e.target.value })}>
                            <MenuItem value="ol"><img src={process.env.PUBLIC_URL + '/olskarm.png'} alt="OL" height={16} width={16}/><span>OL</span></MenuItem>
                            <MenuItem value="night"><NightsStayIcon/><span>Natt-OL</span></MenuItem>
                            <MenuItem value="Run"><DirectionsRunOutlinedIcon/><span>Löpning</span></MenuItem>
                            <MenuItem value="Ride"><DirectionsBikeOutlinedIcon/><span>Cykel</span></MenuItem>
                            <MenuItem value="VirtualRide"><DirectionsBikeOutlinedIcon/><span>Cykel inne</span></MenuItem>
                            <MenuItem value="WeightTraining"><FitnessCenterOutlinedIcon/><span>Styrketräning</span></MenuItem>
                            <MenuItem value="Swim"><PoolIcon/><span>Simning</span></MenuItem>
                            <MenuItem value="Workout"><AccessibilityNewIcon/><span>Annat</span></MenuItem>
                            <MenuItem value="NordicSki"><img src={process.env.PUBLIC_URL + '/ski.png'} alt="Ski" height={16} width={16}/><span>Skidor</span></MenuItem>
                            <MenuItem value="RollerSki"><img src={process.env.PUBLIC_URL + '/ski.png'} alt="Rullskidor" height={16} width={16}/><span>Rullskidor</span></MenuItem>
                            <MenuItem value="Kayaking"><img src={process.env.PUBLIC_URL + '/kayak.png'} alt="Kayak" height={16} width={16}/><span>Kajak</span></MenuItem>
                            <MenuItem value="Walk"><DirectionsWalkIcon/><span>Gång</span></MenuItem>
                        </Select>
                    </TableCell>}
                {(this.state.isEditing && !this.props.performedIsHidden) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.ol} onChange={(e) => this.setState({ ol: e.target.checked })} style={styles.checkbox}/></TableCell>}
                {(this.state.isEditing && !this.props.performedIsHidden) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.night} onChange={(e) => this.setState({ night: e.target.checked })} style={styles.checkbox}/></TableCell>}
                {(this.state.isEditing && !this.props.performedIsHidden) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.quality} onChange={(e) => this.setState({ quality: e.target.checked })} style={styles.checkbox}/></TableCell>}
                {(this.state.isEditing && !this.props.performedIsHidden) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.lsd} onChange={(e) => this.setState({ lsd: e.target.checked })} style={styles.checkbox}/></TableCell>}
                {(this.state.isEditing && !this.props.performedIsHidden) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.strength} onChange={(e) => this.setState({ strength: e.target.checked })} style={styles.checkbox}/></TableCell>}
                {(this.state.isEditing && !this.props.performedIsHidden) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.alternative} onChange={(e) => this.setState({ alternative: e.target.checked })} style={styles.checkbox}/></TableCell>}
                {(this.state.isEditing && !this.props.performedIsHidden) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.forest} onChange={(e) => this.setState({ forest: e.target.checked })} style={styles.checkbox}/></TableCell>}
                {(this.state.isEditing && !this.props.performedIsHidden) && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.path} onChange={(e) => this.setState({ path: e.target.checked })} style={styles.checkbox}/></TableCell>}
                {(this.state.isEditing && !this.props.performedIsHidden) && <TableCell style={styles.dataCell}><TextField variant="outlined" fullWidth={true} value={getDistanceEdit(this.state.distance)} onChange={this.correctDistance} error={this.validateDistance()} helperText={this.validateDistance() ? 'Fel' : ' '}/></TableCell>}
                {(this.state.isEditing && !this.props.performedIsHidden) && <TableCell style={styles.dataCell}><TextField variant="outlined" fullWidth={true} value={this.state.movingTime} onChange={this.correctMovingTime} error={this.validateMovingTime()} helperText={this.validateMovingTime() ? 'Fel' : ' '}/></TableCell>}

                {(this.props.eventData.dateRowSpan > 0 && (this.state.isEditing && !this.props.performedIsHidden)) && <TableCell rowSpan={this.props.eventData.dateRowSpan} align="center" style={styles.smallCell}><Checkbox checked={this.state.skada} onChange={(e) => this.setState({ skada: e.target.checked })} style={styles.checkbox}/></TableCell>}
                {(this.props.eventData.dateRowSpan > 0 && (this.state.isEditing && !this.props.performedIsHidden)) && <TableCell rowSpan={this.props.eventData.dateRowSpan} align="center" style={styles.smallCell}><Checkbox checked={this.state.sjuk} onChange={(e) => this.setState({ sjuk: e.target.checked })} style={styles.checkbox}/></TableCell>}

            </TableRow>
        );
    }
}

export default WeekEvent;
