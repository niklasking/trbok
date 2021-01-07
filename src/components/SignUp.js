import React from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://www.okorion.com/">
        OK Orion Stars FC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  //const backendBaseUrl = 'http://localhost:3333';
    const backendBaseUrl = 'http:trbok_backend.niklasking.com//:3333';


  const onFormSubmit = async (event) => {
    event.preventDefault();
    const {name, username, email, password, useStrava, isPrivate } = event.target.elements;
    const user = {
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value,
        useStrava: useStrava.checked ? true : false,
        private: isPrivate.checked ? true : false
    };
    const response = await axios.post(backendBaseUrl + '/api/v1/register', user);
    if (response.data.success) {
//            console.log(response.data.user);
        if (user.useStrava) {
            const user = {userId: user._id};
            axios.post(backendBaseUrl + '/api/v1/registerStrava', user);
        }
        history.push('/');
//        props.setLoggedInUser(response.data.user);
    } else {
        console.log(response.data.message);
    }

}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Skapa en ny användare
        </Typography>
        <form className={classes.form} onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Namn"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Användarnamn"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="E-postadress"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Lösenord"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox id="useStrava" value="useStrava" color="primary" defaultChecked={true}/>}
                label="Jag vill hämta min träning automatiskt från Strava."
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox id="isPrivate" value="isPrivate" color="primary" />}
                label="Jag vill vara privat och vill inte dela min träning med andra."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Skapa användare
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Har du redan en användare? Logga in istället.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}