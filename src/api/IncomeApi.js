import axios from 'axios';
import Auth from '../components/auth/auth';

var instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

var xApiKey = process.env.REACT_APP_X_API_KEY
var user = Auth.getAuth()

const IncomeApi = {

    update: (accountUuid, payload) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': xApiKey
            }
        };
        return instance.put('/incomes?accountUuid='+accountUuid, JSON.stringify(payload), options);
    }
}

export default IncomeApi;