import React, { Component } from "react";
import axios from 'axios';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';

import Chip from '@material-ui/core/Chip';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import DirectionsBikeOutlinedIcon from '@material-ui/icons/DirectionsBikeOutlined';
import PoolIcon from '@material-ui/icons/Pool';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import EventIcon from '@material-ui/icons/Event';

//const backendBaseUrl = 'http://localhost:3333';
const backendBaseUrl = 'https://trbokbackend.niklasking.com';


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
//  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
//  margin: `0 5px 5px 0`,
  height: 40,

  // change background colour if dragging
//  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getPerformedEventStyle = () => ({
//    background: 'grey',
//    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  //  margin: `0 5px 5px 0`,
    height: 40,
  })

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

momentDurationFormatSetup(moment);

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
    return ' (' + moment.duration(time, "seconds").format("H:mm") + ')';
}
function getName(name) {
    if (name === undefined) {
        return '';
    }
    return name;
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
            return <EventIcon/>;
    }
}
const CHIP_MAX_WIDTH =  180;
const CHIP_MIN_WIDTH =  180;
const CHIP_ICON_WIDTH = 30;

const EllipsisText = (props) => {
  const { children } = props

  return (
    <div style={{
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: CHIP_MAX_WIDTH - CHIP_ICON_WIDTH,
      minWidth: CHIP_MIN_WIDTH
      }}>
      {children}
    </div>
  )
}

class ReorderDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
//      items: getItems(10)
      items: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
      for (let i = 0; i < this.props.events.length; i++) {
        this.state.items.push(
            {
                id: this.props.events[i]._id,
                content: getName(this.props.events[i].namePlanned) + 
                         getTime(this.props.events[i].movingTimePlanned),
                typePlanned: this.props.events[i].typePlanned,
                movingTimePlanned: this.props.events[i].movingTimePlanned,
                distancePlanned: this.props.events[i].distancePlanned,
                namePlanned: this.props.events[i].namePlanned
            }
        )
      }
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }
handleClose() {
      this.props.onClose("Klart");
  }
handleCloseOk = async () => {
    for (let i = 0; i < this.props.events.length; i++) {
//        console.log(this.state.items[i].id + ' *** ' + this.props.events[i]._id);
        if (this.state.items[i].id !== this.props.events[i]._id) {
//            console.log("*** HITTADE EN ÄNDRAD ***");
            const activity = {
                _id: this.props.events[i]._id,
                name: this.props.events[i].name,
                distance: this.props.events[i].distance,
                type: this.props.events[i].type,
                movingTime: this.props.events[i].movingTime,
                ol: this.props.events[i].ol,
                night: this.props.events[i].night,
                quality: this.props.events[i].quality,
                lsd: this.props.events[i].lsd,
                strength: this.props.events[i].strength,
                alternative: this.props.events[i].alternative,
                forest: this.props.events[i].forest,
                path: this.props.events[i].path,
                typePlanned: this.state.items[i].typePlanned,
                movingTimePlanned: this.state.items[i].movingTimePlanned,
                distancePlanned: this.state.items[i].distancePlanned,
                namePlanned: this.state.items[i].namePlanned
            };
//            console.log(activity);
            let deleteEvent = true;
            if (activity.alternative !== 0) {
                deleteEvent = false;
            } else if (activity.distance !== 0) {
                deleteEvent = false;
            } else if (activity.distancePlanned !== undefined) {
                deleteEvent = false;
            } else if (activity.forest !== 0) {
                deleteEvent = false;
            } else if (activity.lsd !== 0) {
                deleteEvent = false;
            } else if (activity.movingTime !== null) {
                deleteEvent = false;
            } else if (activity.movingTimePlanned !== undefined) {
                deleteEvent = false;
            } else if (activity.name !== '') {
                deleteEvent = false;
            } else if (!(activity.namePlanned === undefined || activity.namePlanned === null)) {
                deleteEvent = false;
            } else if (activity.night !== 0) {
                deleteEvent = false;
            } else if (activity.ol !== 0) {
                deleteEvent = false;
            } else if (activity.path !== 0) {
                deleteEvent = false;
            } else if (activity.quality !== 0) {
                deleteEvent = false;
            } else if (activity.strength !== 0) {
                deleteEvent = false;
            } else if (activity.type !== '') {
                deleteEvent = false;
            } else if (activity.typePlanned !== undefined) {
                deleteEvent = false;
            }

            if (deleteEvent) {
                const url = backendBaseUrl + '/api/v1/activities/' + activity._id;
                await axios.delete(url);        
            } else {
                const url = backendBaseUrl + '/api/v1/activities';
                await axios.patch(url, activity);
            }
        }
    }
    this.props.onClose(this.state.items);
}
handleCloseNok = () => {
    this.props.onClose("NOK");
}

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
        <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
            <table><thead><tr><td>Planerad</td><td>Utförd</td></tr></thead><tbody><tr><td>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    >
                    {this.state.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                            >
                                <Chip
                                    icon={getTypeIcon(item.typePlanned)}
                                    label={<EllipsisText>{item.content}</EllipsisText>}
                                    clickable
                                    color="primary"
                                />
                            </div>
                        )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
            </td>
            <td>
                <div style={getListStyle(false)}>
                    {this.props.events.map((event) => (
                        <div key={'performedEvent_' + event._id} style={getPerformedEventStyle()}>
                            <Chip
                                icon={getTypeIcon(event.type)}
                                label={<EllipsisText>{event.name}</EllipsisText>}
                                clickable
                                color="secondary"
                            />
                        </div>
                    ))}
                </div>
            </td>
            </tr></tbody></table>
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
export default ReorderDialog;