import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SignInSide from './SignInSide';
import AppLoggedIn from './AppLoggedIn';
import SignUp from './SignUp';

//const backendBaseUrl = 'http://localhost:3333';
const backendBaseUrl = 'https://trbokbackend.niklasking.com';

class App extends React.Component {
    state = { 
        loggedInUser: null,
        userName: ''
    }

    setLoggedInUser = (user) => {
        this.setState({loggedInUser: user});
        this.setState({userName: user.name});

    }
    onLogoutClick = () => {
        this.setState({loggedInUser: null});
        this.setState({userName: ''});
    }
    isLoggedIn() {
        return this.state.loggedInUser === null ? false : true;
    }
    fetchActivities = async (start, end) => {
        end = moment(end).add(1, 'd').format('YYYY-MM-DD');
        const url = backendBaseUrl + '/api/v1/activities?dateStart=' + start + '&dateEnd=' + end + '&user=' + this.state.loggedInUser._id;
        const response = await axios.get(url);
        return response.data;
    }

    render() {
        return (
            <Router>
                <div style={{padding: '5px'}}>
                    <div>
                        <AppBar position="static">
                            <Toolbar>
                                <Box display='flex' flexGrow={1} alignItems="center">
                                    <IconButton edge="start" color="inherit" aria-label="menu">
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h6">
                                        OK Orions träningsdagbok
                                    </Typography>
                                </Box>
                                {this.state.loggedInUser !== null && <AccountCircleOutlinedIcon/>}
                                &nbsp;&nbsp;
                                {this.state.loggedInUser !== null && <Typography variant="h6">{this.state.userName}</Typography>}                            
                                {this.state.loggedInUser !== null && <Button color="inherit" onClick={this.onLogoutClick}><LockOutlinedIcon/></Button>}
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div>
                        <Switch>
                            {this.state.loggedInUser !== null && <Route exact path="/" render={(props)=><AppLoggedIn loggedInUser={this.state.loggedInUser} fetchActivities={this.fetchActivities}/>}/>}
                            {this.state.loggedInUser === null && <Route exact path='/' render={(props)=><SignInSide setLoggedInUser={this.setLoggedInUser}/>} />}
                            <Route exact path='/register' component={SignUp} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
export default App;