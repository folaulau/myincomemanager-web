import axios from 'axios';
import Auth from '../components/auth/auth';

var instance = axios.create({
    baseURL: process.env.REACT_APP_GRAPHQL_URL
});

var authToken = Auth.getAuthToken()

const IncomeGraphQL = {

    getIncomes: () => {
        const operationsDoc = `
            query MyQuery {
                incomes(where: {deleted: {_eq: false}}) {
                    id
                    uuid
                    companyName: company_name
                    createdAt: created_at
                    endDate: end_date
                    nextPayDay: next_pay_day
                    payPeriod: pay_period
                    payPeriodNetAmount: pay_period_net_amount
                    payType: pay_type
                    position
                    startDate: start_date
                    updatedAt: updated_at
                    yearlyTotal: yearly_total
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

export default IncomeGraphQL;