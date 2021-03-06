import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';

import EditIcon from "@material-ui/icons/EditOutlined";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import FindReplaceIcon from '@material-ui/icons/FindReplace';

import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';

function EditEventDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <List>
        {!props.emptyDay && <ListItem autoFocus button onClick={() => handleListItemClick('editEvent')}>
          <ListItemAvatar>
            <Avatar>
              <EditIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Ändra aktiviteten" />
        </ListItem>}
        <ListItem button onClick={() => handleListItemClick('addEvent')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Lägg till en aktiviteten" />
        </ListItem>
        {!props.emptyDay && <ListItem button onClick={() => handleListItemClick('deleteEvent')}>
          <ListItemAvatar>
            <Avatar>
              <DeleteIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Ta bort aktiviteten" />
        </ListItem>}
        {(props.noOfEvents > 1) && <ListItem button onClick={() => handleListItemClick('reorder')}>
          <ListItemAvatar>
            <Avatar>
              <FindReplaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Editera dagens aktiviteter" />
        </ListItem>}
        <ListItem button onClick={() => handleListItemClick('strava')}>
          <ListItemAvatar>
            <Avatar>
            <img src={process.env.PUBLIC_URL + '/strava.png'} alt="Strava" height={39} width={39} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Synka från Strava" />
        </ListItem>
        <Divider/>
        {(!props.skada && props.isFirstEvent) && <ListItem button onClick={() => handleListItemClick('isSkadad')}>
          <ListItemAvatar>
            <Avatar>
              <AccessibleForwardIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Jag är skadad" /><SentimentDissatisfiedOutlinedIcon/>
        </ListItem>}
        {(props.skada  && props.isFirstEvent) && <ListItem button onClick={() => handleListItemClick('isNotSkadad')}>
          <ListItemAvatar>
            <Avatar>
              <DirectionsRunOutlinedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Jag är hel" /><SentimentSatisfiedOutlinedIcon/>
        </ListItem>}
        {(!props.sjuk  && props.isFirstEvent) && <ListItem button onClick={() => handleListItemClick('isSjuk')}>
          <ListItemAvatar>
            <Avatar>
              <LocalHospitalOutlinedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Jag är sjuk" /><SentimentDissatisfiedOutlinedIcon/>
        </ListItem>}
        {(props.sjuk  && props.isFirstEvent) && <ListItem button onClick={() => handleListItemClick('isNotSjuk')}>
          <ListItemAvatar>
            <Avatar>
              <DirectionsRunOutlinedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Jag är frisk" /><SentimentSatisfiedOutlinedIcon/>
        </ListItem>}
      </List>
    </Dialog>
  );
}
export default EditEventDialog;
