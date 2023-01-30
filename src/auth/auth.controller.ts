import Controller from "../shared/interfaces/controller.interface";
import {NextFunction, Router, Request, Response} from "express";
import userModel from "../user/user.model";
import AuthService from "./auth.service";
import {RegisterDto} from "./dto/register.dto";
import {multerStorage} from "../lib/multer";
import HttpException from "../shared/exceptions/http-exception";

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
        this.router.post(`${this.path}/register`, multerStorage, this.register);
    }

    private register = async (request: Request, response: Response, next: NextFunction) => {
        const {name, surname, username} = request.body;
        try {
            const newUser: RegisterDto = {name, surname, username, avatar: request.files[0].location};
            const {token, user} = await this.authService.register(newUser);
            response.json({token, user});
        } catch (error: HttpException) {
            console.log("ERROR OBTENIDO", error)
            response.json(error.messageJson())
        }
    }
}

export default AuthController;