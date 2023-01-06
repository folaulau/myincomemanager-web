import axios from 'axios';
import Auth from '../components/auth/auth';

var instance = axios.create({
    baseURL: process.env.REACT_APP_GRAPHQL_URL
});

var authToken = Auth.getAuthToken()

const TransactionGraphQL = {

    getTransactions: () => {
        const operationsDoc = `
            query MyQuery {
                transactions(where: {deleted: {_eq: false}}, order_by: {datetime: desc}) {
                    id
                    uuid
                    price
                    quantity
                    total
                    name
                    note
                    datetime
                    updatedAt: updated_at
                    createdAt: created_at
                },
                transactions_aggregate {
                    aggregate {
                        sum {
                            total
                        }
                    }
                }
            }             
        `;
        let request = {};
        request.query = operationsDoc;
        var options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + authToken
            }
        };
        return instance.post("", JSON.stringify(request), options);
    }
}

export default TransactionGraphQL;