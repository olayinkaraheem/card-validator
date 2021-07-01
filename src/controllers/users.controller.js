import UserService from "../services/user.service";

export default class UsersController {
    authenticateClient(req, res) {
        const userService = new UserService();
        const authentication = userService.authenticateClient(req.body.clientId);

        if (!authentication.error) {
            return res
                .status(authentication.code)
                .send({ status: authentication.code, data: authentication.data });
        }
        return res
            .status(authentication.code)
            .send({ status: authentication.code, error: authentication.message });
    }
}