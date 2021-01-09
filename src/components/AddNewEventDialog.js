import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import DirectionsBikeOutlinedIcon from '@material-ui/icons/DirectionsBikeOutlined';
import PoolIcon from '@material-ui/icons/Pool';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import NightsStayIcon from '@material-ui/icons/NightsStay';

const styles = {
    cell: {
        borderRight: '1px solid gray',
        padding: '5px'
    },
    cellPlanned: {
        borderRight: '1px solid gray',
        padding: '5px',
        backgroundColor: 'lightBlue'
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
    hiddenCellPlanned: {
        borderRight: '1px solid gray',
        padding: '0',
        width: '20px',
        backgroundColor: 'lightBlue'
    },
    checkbox: {
        width: '16px',
        height: '16px'
    }
};


class AddNewEventDialog extends React.Component {
    state = {
        plannedIsHidden: false,
        performedIsHidden: false,
        typePlanned: '',
        movingTimePlanned: '',
        distancePlanned: 0,
        type: 'Run',
        movingTime: '',
        distance: 0,
        ol: false,
        night: false,
        quality: false,
        lsd: false,
        strength: false,
        alternative: false,
        forest: false,
        path: false
    }

    hidePlanned = () => {
        this.setState({plannedIsHidden: true});
    }
    showPlanned = () => {
        this.setState({plannedIsHidden: false});
    }
    hidePerformed = () => {
        this.setState({performedIsHidden: true});
    }
    showPerformed = () => {
        this.setState({performedIsHidden: false});
    }

    handleCloseNok = () => {
        const item = {
            saveStatus: false
        }
        this.props.handleAddEventClose({item});
    }
    handleCloseOk = () => {
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
        
        const item = {
            saveStatus: true,
            startDate: this.props.dayDate,
            typePlanned: this.state.typePlanned,
            movingTimePlanned: this.state.movingTimePlanned,
            distancePlanned: this.state.distancePlanned,
            name: this.state.name,
            type: this.state.type === false ? 'Run' : this.state.type,
            movingTime: this.state.movingTime,
            distance: this.state.distance,
            ol: this.state.ol,
            night: this.state.night,
            quality: this.state.quality,
            lsd: this.state.lsd,
            strength: this.state.strength,
            alternative: this.state.alternative,
            forest: this.state.forest,
            path: this.state.path
    
        }
        this.props.handleAddEventClose({item});
    }

    validatePlannedDistance = () => {
        return isNaN(this.state.distancePlanned);
    }
    correctPlannedDistance = (event) => {
        this.setState({ distancePlanned: event.target.value.replace(/[^\d.-]/g, '') });
    }
    validateDistance = () => {
        return isNaN(this.state.distance);
    }
    correctDistance = (event) => {
        this.setState({ distance: event.target.value.replace(/[^\d.-]/g, '') });
    }
    validatePlannedMovingTime = () => {
        const re = /^(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$)|(^[0-9]*$)/;
        if (this.state.movingTimePlanned.match(re)) {
            return false;
        } else {
            return true;
        }
    }
    correctPlannedMovingTime = (event) => {
        this.setState({ movingTimePlanned: event.target.value.replace(/[^\d:]/g, '') });
    }
    validateMovingTime = () => {
        const re = /^(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$)|(^[0-9]*$)/;
        if (this.state.movingTime.match(re)) {
            return false;
        } else {
            return true;
        }
    }
    correctMovingTime = (event) => {
        this.setState({ movingTime: event.target.value.replace(/[^\d:]/g, '') });
    }
    
    render() {
        return (
            <Dialog open={this.props.open} fullScreen={true} style={{padding: 10}}>
                <DialogTitle>Lägg till en ny aktivitet</DialogTitle>
                <Table aria-label="spanning table" style={{borderTop: '1px solid gray'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan={2} style={styles.dateCell} align="left">
                                Datum
                            </TableCell>
                            {this.state.plannedIsHidden && <TableCell style={styles.hiddenCellPlanned}>
                                    <Button onClick={this.showPlanned}><VisibilityOutlinedIcon/></Button>
                                </TableCell>}
                            {!this.state.plannedIsHidden && <TableCell colSpan={4} style={styles.cellPlanned}>
                                <Box display="flex" p={1} padding={0} alignitems="center">
                                    <Box p={1} flexGrow={1} padding={0}>
                                        Planerad
                                    </Box>
                                    <Box p={1} padding={0}>
                                        <Button onClick={this.hidePlanned}><VisibilityOffOutlinedIcon/></Button>
                                    </Box>
                                </Box>
                            </TableCell>}
                            {this.state.performedIsHidden && <TableCell style={styles.hiddenCell}>
                            <Button onClick={this.showPerformed}><VisibilityOutlinedIcon/></Button>
                                </TableCell>}
                                {!this.state.performedIsHidden && <TableCell colSpan={12} style={styles.cell}>
                                <Box display="flex" p={1} padding={0} alignitems="center">
                                    <Box p={1} flexGrow={1} padding={0}>
                                        Utförd
                                    </Box>
                                    <Box p={1} padding={0}>
                                        <Button onClick={this.hidePerformed}><VisibilityOffOutlinedIcon/></Button>
                                    </Box>
                                </Box>
                            </TableCell>}
                        </TableRow>
                        <TableRow>
                            {this.state.plannedIsHidden && <TableCell style={styles.hiddenCellPlanned}></TableCell>}
                            {!this.state.plannedIsHidden && <TableCell style={styles.cellPlanned}>Beskrivning</TableCell>}
                            {!this.state.plannedIsHidden && <TableCell align="center" style={styles.cellPlanned}>Typ</TableCell>}
                            {!this.state.plannedIsHidden && <TableCell align="right" style={styles.cellPlanned}>Längd</TableCell>}
                            {!this.state.plannedIsHidden && <TableCell align="right" style={styles.cellPlanned}>Tid</TableCell>}
                            
                            {this.state.performedIsHidden && <TableCell style={styles.hiddenCell}/>}
                            {!this.state.performedIsHidden && <TableCell style={styles.cell}>Beskrivning</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.cell}>Typ</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}>OL</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}>Natt</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}>Q</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}>LP</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}>Sty</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}>Alt</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}>Skog</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}>Stig</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="right" style={styles.cell}>Längd</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="right" style={styles.cell}>Tid</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={this.props.dayDate}>
                            <TableCell style={styles.dateCell} align="left">{this.props.dayDate}</TableCell>

                            {this.state.plannedIsHidden && <TableCell style={styles.hiddenCell}></TableCell>}
                            {!this.state.plannedIsHidden && <TableCell style={styles.cell}><TextField variant="outlined" multiline={true} fullWidth={true} rows={3} value={this.state.namePlanned} onChange={(e) => this.setState({ namePlanned: e.target.value })} /></TableCell>}
                            {!this.state.plannedIsHidden && <TableCell style={styles.cell}><Select defaultValue="" onChange={(e) => this.setState({ type: e.target.valuePlanned })}><MenuItem value="ol"><img src={process.env.PUBLIC_URL + '/olskarm.png'} alt="OL" height={16} width={16}/><span>OL</span></MenuItem><MenuItem value="night"><NightsStayIcon/><span>Natt-OL</span></MenuItem><MenuItem value="Run"><DirectionsRunOutlinedIcon/><span>Löpning</span></MenuItem><MenuItem value="Ride"><DirectionsBikeOutlinedIcon/><span>Cykel</span></MenuItem><MenuItem value="VirtualRide"><DirectionsBikeOutlinedIcon/><span>Cykel inne</span></MenuItem><MenuItem value="WeightTraining"><FitnessCenterOutlinedIcon/><span>Styrketräning</span></MenuItem><MenuItem value="Swim"><PoolIcon/><span>Simning</span></MenuItem><MenuItem value="Workout"><AccessibilityNewIcon/><span>Annat</span></MenuItem><MenuItem value="NordicSki"><img src={process.env.PUBLIC_URL + '/ski.png'} alt="Ski" height={16} width={16}/><span>Skidor</span></MenuItem><MenuItem value="RollerSki"><img src={process.env.PUBLIC_URL + '/ski.png'} alt="Rullskidor" height={16} width={16}/><span>Rullskidor</span></MenuItem><MenuItem value="Kayaking"><img src={process.env.PUBLIC_URL + '/kayak.png'} alt="Kayak" height={16} width={16}/><span>Kajak</span></MenuItem><MenuItem value="Walk"><DirectionsWalkIcon/><span>Gång</span></MenuItem></Select></TableCell>}
                            {!this.state.plannedIsHidden && <TableCell style={styles.dataCell}><TextField variant="outlined" fullWidth={true} value={this.state.distancePlanned} onChange={this.correctPlannedDistance} error={this.validatePlannedDistance()} helperText={this.validatePlannedDistance() ? 'Fel' : ' '}/></TableCell>}
                            {!this.state.plannedIsHidden && <TableCell style={styles.dataCell}><TextField variant="outlined" fullWidth={true} value={this.state.movingTimePlanned} onChange={this.correctPlannedMovingTime} error={this.validatePlannedMovingTime()} helperText={this.validatePlannedMovingTime() ? 'Fel' : ' '}/></TableCell>}

                            {this.state.performedIsHidden && <TableCell style={styles.hiddenCell}/>}
                            {!this.state.performedIsHidden && <TableCell style={styles.cell}><TextField variant="outlined" multiline={true} fullWidth={true} rows={3} value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} /></TableCell>}
                            {!this.state.performedIsHidden && <TableCell style={styles.cell}><Select defaultValue="Run" onChange={(e) => this.setState({ type: e.target.value })}><MenuItem value="ol"><img src={process.env.PUBLIC_URL + '/olskarm.png'} alt="OL" height={16} width={16}/><span>OL</span></MenuItem><MenuItem value="night"><NightsStayIcon/><span>Natt-OL</span></MenuItem><MenuItem value="Run"><DirectionsRunOutlinedIcon/><span>Löpning</span></MenuItem><MenuItem value="Ride"><DirectionsBikeOutlinedIcon/><span>Cykel</span></MenuItem><MenuItem value="VirtualRide"><DirectionsBikeOutlinedIcon/><span>Cykel inne</span></MenuItem><MenuItem value="WeightTraining"><FitnessCenterOutlinedIcon/><span>Styrketräning</span></MenuItem><MenuItem value="Swim"><PoolIcon/><span>Simning</span></MenuItem><MenuItem value="Workout"><AccessibilityNewIcon/><span>Annat</span></MenuItem><MenuItem value="NordicSki"><img src={process.env.PUBLIC_URL + '/ski.png'} alt="Ski" height={16} width={16}/><span>Skidor</span></MenuItem><MenuItem value="RollerSki"><img src={process.env.PUBLIC_URL + '/ski.png'} alt="Rullskidor" height={16} width={16}/><span>Rullskidor</span></MenuItem><MenuItem value="Kayaking"><img src={process.env.PUBLIC_URL + '/kayak.png'} alt="Kayak" height={16} width={16}/><span>Kajak</span></MenuItem><MenuItem value="Walk"><DirectionsWalkIcon/><span>Gång</span></MenuItem></Select></TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.ol} onChange={(e) => this.setState({ ol: e.target.checked })} style={styles.checkbox}/></TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.night} onChange={(e) => this.setState({ night: e.target.checked })} style={styles.checkbox}/></TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.quality} onChange={(e) => this.setState({ quality: e.target.checked })} style={styles.checkbox}/></TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.lsd} onChange={(e) => this.setState({ lsd: e.target.checked })} style={styles.checkbox}/></TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.strength} onChange={(e) => this.setState({ strength: e.target.checked })} style={styles.checkbox}/></TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.alternative} onChange={(e) => this.setState({ alternative: e.target.checked })} style={styles.checkbox}/></TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.forest} onChange={(e) => this.setState({ forest: e.target.checked })} style={styles.checkbox}/></TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}><Checkbox checked={this.state.path} onChange={(e) => this.setState({ path: e.target.checked })} style={styles.checkbox}/></TableCell>}
                            {!this.state.performedIsHidden && <TableCell style={styles.dataCell}><TextField variant="outlined" fullWidth={true} value={this.state.distance} onChange={this.correctDistance} error={this.validateDistance()} helperText={this.validateDistance() ? 'Fel' : ' '}/></TableCell>}
                            {!this.state.performedIsHidden && <TableCell style={styles.dataCell}><TextField variant="outlined" fullWidth={true} value={this.state.movingTime} onChange={this.correctMovingTime} error={this.validateMovingTime()} helperText={this.validateMovingTime() ? 'Fel' : ' '}/></TableCell>}
                        </TableRow>
                    </TableBody>
                </Table>
                <DialogActions>
                    <Button onClick={this.handleCloseOk} color="primary" startIcon={<SaveIcon />}>
                        Spara
                    </Button>
                    <Button onClick={this.handleCloseNok} color="primary" startIcon={<Cancel/>}> 
                        Ångra
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AddNewEventDialog;