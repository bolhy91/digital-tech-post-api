import Controller from "../shared/interfaces/controller.interface";
import {NextFunction, Router, Request, Response} from "express";
import userModel from "../user/user.model";
import AuthService from "./auth.service";
import {RegisterDto} from "./dto/register.dto";

class AuthController implements Controller {
    private path: string = '/auth';
    private router: Router = Router();
    private user = userModel;
    public authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.startRoutes();
    }

    startRoutes() {
        this.router.post(`${this.path}/register`,this.register);
    }

    private register = async (request: Request, response: Response, next: NextFunction) => {
        const {name, surname, username} = request.body;
        try {
            const newUser: RegisterDto = {name, surname, username, avatar: request.file?.path};
            const {token, user} = this.authService.register(newUser);
            response.json({token, user});
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;