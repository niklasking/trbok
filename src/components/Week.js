import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import Box from '@material-ui/core/Box';

import WeekDay from './WeekDay';

momentDurationFormatSetup(moment);

class Week extends React.Component {
    state = {
        plannedIsHidden: false,
        performedIsHidden: false
    };
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
    getWeekLength = (events) => {
        let totalDistance = 0;
        events.map(({distance}) => {
            return totalDistance += distance;
        });
        if (totalDistance < 1000) {
            return totalDistance + " m"
        }
        return Math.round(totalDistance*10/1000)/10 + " km";
    }
    getWeekTime = (events) => {
        let time = 0;
        events.map(({movingTime}) => {
            return time += movingTime;
        });
        return moment.duration(time, "seconds").format("H:mm")
    }
    NoOfOl(events) {
        let result = 0;
        events.map(({ol}) => {
            return result += ol;
        })
        return result;
    }
    NoOfNight(events) {
        let result = 0;
        events.map(({night}) => {
            return result += night;
        })
        return result;
    }
    NoOfQuality(events) {
        let result = 0;
        events.map(({quality}) => {
            return result += quality;
        })
        return result;
    }
    NoOfLsd(events) {
        let result = 0;
        events.map(({lsd}) => {
            return result += lsd;
        })
        return result;
    }
    NoOfStrength(events) {
        let result = 0;
        events.map(({strength}) => {
            return result += strength;
        })
        return result;
    }
    NoOfAlternative(events) {
        let result = 0;
        events.map(({alternative}) => {
            return result += alternative;
        })
        return result;
    }
    NoOfForest(events) {
        let result = 0;
        events.map(({forest}) => {
            return result += forest;
        })
        return result;
    }
    NoOfPath(events) {
        let result = 0;
        events.map(({path}) => {
            return result += path;
        })
        return result;
    }
    NoOfSkada(events) {
        let result = 0;
        for (let i = 0; i < events.length; i++) {
            if (events[i].skada !== undefined && events[i].skada === 1) {
                result++;
            }
        }
        return result;
    }
    NoOfSjuk(events) {
        let result = 0;
        for (let i = 0; i < events.length; i++) {
            if (events[i].sjuk !== undefined && events[i].sjuk === 1) {
                result++;
            }
        }
        return result;
    }

    render() {
        if (this.props.user === null) {
            return <div></div>
        }
    
        let dateToPrint = moment(this.props.dateStart);
        let lastDate = moment(this.props.dateEnd);
        let daysToShow = [];
    
//        console.log(this.props.days);
        while (lastDate.isSameOrAfter(dateToPrint, 'day')) {
            const events = this.props.activities.filter( (event) => moment(event.startDate).isSame(dateToPrint, 'day') );
            const days = this.props.days.filter( (event) => moment(event.startDate).isSame(dateToPrint, 'day') );
            daysToShow.push(<WeekDay 
                    key={dateToPrint} 
                    date={dateToPrint.format('YYYY-MM-DD')} 
                    dayName={dateToPrint.locale('sv').format('dddd').charAt(0).toUpperCase() + dateToPrint.locale('sv').format('dddd').slice(1)}
                    events={events} 
                    days={days}
                    plannedIsHidden={this.state.plannedIsHidden}
                    user={this.props.user}
                    upDatePage={this.props.upDatePage}
                    performedIsHidden ={this.state.performedIsHidden}
                />);
            dateToPrint.add(1, 'd');
        }
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
                width: '20px'
            },
            editCell: {
                borderRight: '1px solid gray',
                padding: '0',
                width: '20px'
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
            hiddenCellPlanned: {
                borderRight: '1px solid gray',
                padding: '0',
                width: '20px',
                backgroundColor: 'lightBlue'
            },
            summaryCell: {
                borderRight: '1px solid gray',
                padding: '5px',
                backgroundColor: 'gray',
                color: 'white',
                fontWeight: 'bold'
            },
            smallSummaryCell: {
                borderRight: '1px solid gray',
                padding: '1px',
                backgroundColor: 'gray',
                color: 'white',
                fontWeight: 'bold'
            }
        };
        return (
            <TableContainer component={Paper}>
                <Table aria-label="spanning table" style={{borderTop: '1px solid gray'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan={2} style={styles.editCell}></TableCell>
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
                            {!this.state.performedIsHidden && <TableCell colSpan={14} style={styles.cell}>
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

                            {this.state.performedIsHidden && <TableCell style={styles.hiddenCell}></TableCell>}

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
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}>Skada</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallCell}>Sjuk</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {daysToShow}
                        <TableRow key="summaryRow">
                            <TableCell colSpan={2} style={styles.summaryCell}></TableCell>
                            {!this.state.plannedIsHidden && <TableCell style={styles.summaryCell} colSpan={4}></TableCell>}
                            {this.state.plannedIsHidden && <TableCell style={styles.summaryCell}></TableCell>}
                            {!this.state.performedIsHidden && <TableCell colSpan={2} style={styles.summaryCell}></TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallSummaryCell}>{this.NoOfOl(this.props.activities)}</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallSummaryCell}>{this.NoOfNight(this.props.activities)}</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallSummaryCell}>{this.NoOfQuality(this.props.activities)}</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallSummaryCell}>{this.NoOfLsd(this.props.activities)}</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallSummaryCell}>{this.NoOfStrength(this.props.activities)}</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallSummaryCell}>{this.NoOfAlternative(this.props.activities)}</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallSummaryCell}>{this.NoOfForest(this.props.activities)}</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallSummaryCell}>{this.NoOfPath(this.props.activities)}</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="right" style={styles.summaryCell}>{this.getWeekLength(this.props.activities)}</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="right" style={styles.summaryCell}>{this.getWeekTime(this.props.activities)}</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallSummaryCell}>{this.NoOfSkada(this.props.days)}</TableCell>}
                            {!this.state.performedIsHidden && <TableCell align="center" style={styles.smallSummaryCell}>{this.NoOfSjuk(this.props.days)}</TableCell>}
                            {this.state.performedIsHidden && <TableCell style={styles.summaryCell}></TableCell>}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default Week;
