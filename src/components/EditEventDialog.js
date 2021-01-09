import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import EditIcon from "@material-ui/icons/EditOutlined";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function EditEventDialog(props) {
  const classes = useStyles();
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
        <ListItem autoFocus button onClick={() => handleListItemClick('editEvent')}>
          <ListItemAvatar>
            <Avatar>
              <EditIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Ändra aktiviteten" />
        </ListItem>
        <ListItem autoFocus button onClick={() => handleListItemClick('addEvent')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Lägg till en aktiviteten" />
        </ListItem>
        <ListItem autoFocus button onClick={() => handleListItemClick('deleteEvent')}>
          <ListItemAvatar>
            <Avatar>
              <DeleteIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Ta bort aktiviteten" />
        </ListItem>
      </List>
    </Dialog>
  );
}
export default EditEventDialog;
