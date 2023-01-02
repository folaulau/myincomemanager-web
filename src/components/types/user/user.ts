
export default interface User {
    id: number;
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    account: Account;
}

export interface Account {
    id: number;
    uuid: string;
    address: Address;
}

export interface Address {
    id: number;
    uuid: string;
    street: string;
    street2: string;
    city: string;
    state: string;
    zipcode: string;
    longitude: number;
    latitude: number;
}