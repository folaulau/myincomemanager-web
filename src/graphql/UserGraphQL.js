import axios from 'axios';
import Auth from '../components/auth/auth';

var instance = axios.create({
    baseURL: process.env.REACT_APP_GRAPHQL_URL
});

var auth = Auth.getAuth()

const UserGraphQL = {

    getProfile: () => {
        const operationsDoc = `
            query MyQuery {
                users {
                    id
                    last_name
                    first_name
                    email
                    phone_number
                    status
                    user_type
                    uuid
                    third_party_name
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
                            updated_at
                            primary_address
                            country
                            created_at
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
                'Authorization': "Bearer " + auth.token
            }
        };
        return instance.post("", JSON.stringify(request), options);
    }
}

export default UserGraphQL;