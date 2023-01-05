import axios from 'axios';
import Auth from '../components/auth/auth';

var instance = axios.create({
    baseURL: process.env.REACT_APP_GRAPHQL_URL
});

var authToken = Auth.getAuthToken()

const UserGraphQL = {

    getProfile: () => {
        const operationsDoc = `
            query MyQuery {
                users {
                    id
                    uuid
                    lastName: last_name
                    firstName: first_name
                    email
                    phoneNumber: phone_number
                    status
                    type: user_type
                    thirdPartyName: third_party_name
                    account {
                        address {
                            id
                            uuid
                            street
                            street2
                            city
                            zipcode
                            state
                            longitude
                            latitude
                            timezone
                            updatedAt: updated_at
                            primary_address
                            country
                            createdAt: created_at
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

export default UserGraphQL;