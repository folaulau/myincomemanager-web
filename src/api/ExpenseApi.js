import axios from 'axios';
import Auth from '../components/auth/auth';

var instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

var authToken = Auth.getAuthToken()

const ExpenseApi = {

    update: (accountUuid, payload) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'token': authToken
            }
        };
        return instance.put('/expenses?accountUuid='+accountUuid, JSON.stringify(payload), options);
    }
}

export default ExpenseApi;