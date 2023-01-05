import axios from 'axios';
import Auth from '../components/auth/auth';

var instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

var xApiKey = process.env.REACT_APP_X_API_KEY
var authToken = Auth.getAuthToken()

const UserApi = {

    authenticate: (payload) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': xApiKey
            }
        };
        return instance.post('/users/authenticate', JSON.stringify(payload), options);
    },
    updateProfile: (payload) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'token': authToken
            }
        };
        return instance.put('/users/profile', JSON.stringify(payload), options);
    },
}

export default UserApi;