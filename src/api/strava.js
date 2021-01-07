import axios from 'axios';
//Strava Credentials
let clientID = "59119";
let clientSecret = "683dde428eff95f3c3e5c34cbfc554f3a3683fb5";

// refresh token and call address
const refreshToken = "f0e97136017441ba34d9f80fdc23e8a9026e9b21"; // Niklas Bratt
const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`

// endpoint for read-all activities. temporary token is added in getActivities()
const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID 6GxGC2E6o2eDmGH0Cvv-PoWefIvkaE8h0gFVWdqxlCI'
    }
});

// http://www.strava.com/oauth/authorize?client_id=59119&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all
// http://localhost/exchange_token?state=&code=ce89502c610ecea12a3cb364d4050719b0d64400&scope=read,activity:read_all
// ce89502c610ecea12a3cb364d4050719b0d64400

// https://www.strava.com/oauth/token\?client_id\=59119\&client_secret\=683dde428eff95f3c3e5c34cbfc554f3a3683fb5\&code\=ce89502c610ecea12a3cb364d4050719b0d64400\&grant_type\=authorization_code
