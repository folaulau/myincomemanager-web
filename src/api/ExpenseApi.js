import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

var xApiKey = process.env.REACT_APP_X_API_KEY

const ExpenseApi = {

    update: (accountUuid, payload) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': xApiKey
            }
        };
        return instance.put('/expenses?accountUuid='+accountUuid, JSON.stringify(payload), options);
    }
}

export default ExpenseApi;