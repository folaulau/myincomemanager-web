import axios from 'axios';
import Auth from '../components/auth/auth';

var instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

var xApiKey = process.env.REACT_APP_X_API_KEY
var user = Auth.getAuth()

const GoalApi = {

    update: (accountUuid, payload) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': xApiKey
            }
        };
        return instance.put('/goals?accountUuid='+accountUuid, JSON.stringify(payload), options);
    },
    getProfile: () => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'token': user.token
            }
        };
        return instance.get('/users/'+user.uuid, options);
    },
    updateProfile: (payload) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'token': user.token
            }
        };
        return instance.put('/users/profile', JSON.stringify(payload), options);
    },
}

export default GoalApi;