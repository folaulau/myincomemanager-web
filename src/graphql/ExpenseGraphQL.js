import axios from 'axios';
import Auth from '../components/auth/auth';

var instance = axios.create({
    baseURL: process.env.REACT_APP_GRAPHQL_URL
});

var authToken = Auth.getAuthToken()

const ExpenseGraphQL = {

    getExpenses: () => {
        const operationsDoc = `
            query MyQuery {
                expenses(where: {deleted: {_eq: false}}) {
                    id
                    uuid
                    name
                    updatedAt: updated_at
                    monthlyDueDay: monthly_due_day
                    type: expense_type
                    createdAt: created_at
                    amount
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

export default ExpenseGraphQL;