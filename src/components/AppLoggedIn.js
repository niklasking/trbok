import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Summary from './Summary';

//const backendBaseUrl = 'http://localhost:3333';
const backendBaseUrl = 'https://trbokbackend.niklasking.com';

class AppLoggedIn extends React.Component {
    state = { 
        activities: [],
        days: [],
        dateStart: moment().startOf('isoWeek').format('YYYY-MM-DD'),
        dateEnd: moment().endOf('isoWeek').format('YYYY-MM-DD'),
        selectedTab: 'week'
    }
    onWeekTabClick = async (event) => {
        if (event !== null) {
            event.preventDefault();
        }
        this.setState({selectedTab: 'week'});
        this.setState({dateStart: moment().startOf('isoWeek').format('YYYY-MM-DD')});
        this.setState({dateEnd: moment().endOf('isoWeek').format('YYYY-MM-DD')});
        if (this.props.loggedInUser !== null) {
            this.setState({ activities: await this.props.fetchActivities(
                moment().startOf('isoWeek').format('YYYY-MM-DD'),
                moment().endOf('isoWeek').format('YYYY-MM-DD')
            ) });
            this.setState({ days: await this.props.fetchDays(
                moment().startOf('isoWeek').format('YYYY-MM-DD'),
                moment().endOf('isoWeek').format('YYYY-MM-DD')
            ) });
        }
    }
    onMonthTabClick = async (event) => {
        event.preventDefault();
        this.setState({selectedTab: 'month'});
        this.setState({dateStart: moment().startOf('month').format('YYYY-MM-DD'), dateEnd: moment().endOf('month').format('YYYY-MM-DD')})
        if (this.props.loggedInUser !== null) {
            this.setState({ activities: await this.props.fetchActivities(
                moment().startOf('month').format('YYYY-MM-DD'),
                moment().endOf('month').format('YYYY-MM-DD')
            ) });
            this.setState({ days: await this.props.fetchDays(
                moment().startOf('month').format('YYYY-MM-DD'),
                moment().endOf('month').format('YYYY-MM-DD')
            ) });
        }
    }
    onStatTabClick = (event) => {
        event.preventDefault();
        this.setState({selectedTab: 'stat'});
    }
    getEarlierWeek = async () => {
        if (this.props.loggedInUser !== null) {
            this.setState({ activities: await this.props.fetchActivities(
                moment(this.state.dateStart).add(-7, 'd').format('YYYY-MM-DD'),
                moment(this.state.dateEnd).add(-7, 'd').format('YYYY-MM-DD')
            ) });
            this.setState({ days: await this.props.fetchDays(
                moment(this.state.dateStart).add(-7, 'd').format('YYYY-MM-DD'),
                moment(this.state.dateEnd).add(-7, 'd').format('YYYY-MM-DD')
            ) });
            this.setState({dateStart: moment(this.state.dateStart).add(-7, 'd').format('YYYY-MM-DD')});
            this.setState({dateEnd: moment(this.state.dateEnd).add(-7, 'd').format('YYYY-MM-DD')});
        }
    }
    getLaterWeek = async () => {
        if (this.props.loggedInUser !== null) {
            this.setState({ activities: await this.props.fetchActivities(
                moment(this.state.dateStart).add(7, 'd').format('YYYY-MM-DD'),
                moment(this.state.dateEnd).add(7, 'd').format('YYYY-MM-DD')
            ) });
            this.setState({ days: await this.props.fetchDays(
                moment(this.state.dateStart).add(7, 'd').format('YYYY-MM-DD'),
                moment(this.state.dateEnd).add(7, 'd').format('YYYY-MM-DD')
            ) });
            this.setState({dateStart: moment(this.state.dateStart).add(7, 'd').format('YYYY-MM-DD')});
            this.setState({dateEnd: moment(this.state.dateEnd).add(7, 'd').format('YYYY-MM-DD')});
        }
    }
    getEarlierMonth = async () => {
        if (this.props.loggedInUser !== null) {
            this.setState({ activities: await this.props.fetchActivities(
                moment(this.state.dateStart).add(-1, 'M').format('YYYY-MM-DD'),
                moment(this.state.dateEnd).add(-1, 'M').format('YYYY-MM-DD')
            ) });
            this.setState({ days: await this.props.fetchDays(
                moment(this.state.dateStart).add(-1, 'M').format('YYYY-MM-DD'),
                moment(this.state.dateEnd).add(-1, 'M').format('YYYY-MM-DD')
            ) });
            this.setState({dateStart: moment(this.state.dateStart).add(-1, 'M').format('YYYY-MM-DD')});
            this.setState({dateEnd: moment(this.state.dateEnd).add(-1, 'M').format('YYYY-MM-DD')});
        }
    }
    getLaterMonth = async () => {
        if (this.props.loggedInUser !== null) {
            this.setState({ activities: await this.props.fetchActivities(
                moment(this.state.dateStart).add(1, 'M').format('YYYY-MM-DD'),
                moment(this.state.dateEnd).add(1, 'M').format('YYYY-MM-DD')
            ) });
            this.setState({ days: await this.props.fetchDays(
                moment(this.state.dateStart).add(1, 'M').format('YYYY-MM-DD'),
                moment(this.state.dateEnd).add(1, 'M').format('YYYY-MM-DD')
            ) });
            this.setState({dateStart: moment(this.state.dateStart).add(1, 'M').format('YYYY-MM-DD')});
            this.setState({dateEnd: moment(this.state.dateEnd).add(1, 'M').format('YYYY-MM-DD')});
        }
    }
    fetchUpdatedActivities = async () => {
        let end = moment(this.state.dateEnd).add(1, 'd').format('YYYY-MM-DD');
        const url1 = backendBaseUrl + '/api/v1/activities?dateStart=' + this.state.dateStart + '&dateEnd=' + end  + '&user=' + this.props.loggedInUser._id;
        const response1 = await axios.get(url1);
        this.setState({activities: response1.data});

        const url2 = backendBaseUrl + '/api/v1/days?dateStart=' + this.state.dateStart + '&dateEnd=' + end  + '&user=' + this.props.loggedInUser._id;
        const response2 = await axios.get(url2);
        this.setState({days: response2.data});
    }
    componentDidMount() {
        this.onWeekTabClick(null);
    }
    render() {
        return(
            <div>
                <div className="ui top attached tabular menu" key="trDataConfigView">
                    <a className={this.state.selectedTab === 'week' ? 'item active' : 'item'} href="/" onClick={this.onWeekTabClick}>
                        Vecka
                    </a>
                    <a className={this.state.selectedTab === 'month' ? 'item active' : 'item'} href="/" onClick={this.onMonthTabClick}>
                        Månad
                    </a>
                    <a className={this.state.selectedTab === 'stat' ? 'item active' : 'item'} href="/" onClick={this.onStatTabClick}>
                        Statistik
                    </a>
                </div>
                <div className="ui bottom attached segment" key="trDataView">
                    <Summary 
                        selectedTab={this.state.selectedTab}
                        activities={this.state.activities} 
                        days={this.state.days}
                        dateStart={this.state.dateStart}
                        dateEnd={this.state.dateEnd}
                        getEarlierWeek={this.getEarlierWeek}
                        getLaterWeek={this.getLaterWeek}
                        getEarlierMonth={this.getEarlierMonth}
                        getLaterMonth={this.getLaterMonth}
                        user={this.props.loggedInUser}
                        upDatePage={this.fetchUpdatedActivities}
                    />
                </div>
            </div>
        )
    }
}

export default AppLoggedIn;