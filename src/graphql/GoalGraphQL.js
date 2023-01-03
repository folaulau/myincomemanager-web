import axios from 'axios';
import Auth from '../components/auth/auth';

var instance = axios.create({
    baseURL: process.env.REACT_APP_GRAPHQL_URL
});

var auth = Auth.getAuth()

const GoalGraphQL = {

    getGoals: () => {
        const operationsDoc = `
            query MyQuery {
                goals(where: {deleted: {_eq: false}}) {
                    id
                    uuid
                    title
                    targetAmount: target_amount
                    description
                    deleted
                    deadline
                    currentAmount: current_amount
                    amountPerPaycheck: amount_per_paycheck
                    updatedAt: updated_at
                    createdAt: created_at
                }
            }                
        `;
        let request = {};
        request.query = operationsDoc;
        var options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.token
            }
        };
        return instance.post("", JSON.stringify(request), options);
    }
}

export default GoalGraphQL;