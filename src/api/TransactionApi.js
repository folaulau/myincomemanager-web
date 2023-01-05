import axios from 'axios';
import Auth from '../components/auth/auth';

var instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

var authToken = Auth.getAuthToken()

const TransactionApi = {

    create: (transactions) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'token': authToken
            }
        };
        return instance.post('/transactions', JSON.stringify(transactions), options);
    },
    update: (transaction) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'token': authToken
            }
        };
        return instance.put('/transaction', JSON.stringify(transaction), options);
    }
}

export default TransactionApi;