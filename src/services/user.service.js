import {clients} from "../.data/clients";

export default class UserService {
    constructor() {
        this.clients = clients;
    }

    authenticateClient(apiKey) {
        if(this.clientExists(apiKey)) {
            return {
                message: 'Authentication successful',
                error: false,
                code: 200,
                data: this.getClient(apiKey)
            }
        } else {
            return {
                message: 'Invalid Client Credential. Please try again.',
                error: true,
                code: 401
            };
        }
    }

    clientExists(key) {
        const check = this.clients.filter(data => {
            return data.privateKey === key;
        });
        return check.length ? true : false;
    };

    getClient(key) {
        const client = this.clients.filter(data => {
            return data.privateKey === key;
        });
        return client[0];
    }
}