import PaymentService from "../services/payment.service";
import UserService from "../services/user.service";

export default class PaymentController {


    constructor() {
        this.paymentService = new PaymentService();
        this.userService = new UserService();
    }
    validateCardDetails = (req, res) => {

        const authentication = this.userService.authenticateClient(req.headers['api-key']);

        if(authentication.error){
            res.status(authentication.code).send({message: authentication.message, status: authentication.code})
        }
        // console.log('Body: ', ...Object.values(req.body), req.headers['content-type'])

        let body;
        if(this.requestIsJson(req)) {
            body = req.body;
        }

        if(this.requestIsXML(req)) {
            body = Object.values(req.body)[0];
        }
        const validationResponse = this.paymentService.validateCardDetails(body, authentication.data);

        if(validationResponse.error){
            return res.status(validationResponse.code).send({error: validationResponse.message})
        }

        return res.status(validationResponse.code).send(validationResponse.data)

    }

    requestIsJson = (req) => {
        return req.headers['content-type'] === 'application/json';
    }

    requestIsXML = (req) => {
        return req.headers['content-type'] === 'application/xml';
    }
}