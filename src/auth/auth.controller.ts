import Controller from "../shared/interfaces/controller.interface";
import {NextFunction, Router, Request, Response} from "express";
import userModel from "../user/user.model";
import AuthService from "./auth.service";
import {RegisterDto} from "./dto/register.dto";
import {multerStorage} from "../lib/multer";
import HttpException from "../shared/exceptions/http-exception";
import {LoginDto} from "./dto/login.dto";
import validationMiddleware from "../middleware/validation.middleware";

class AuthController implements Controller {
    private path: string = '/auth';
    private router: Router = Router();
    private userModel = userModel;
    public authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.startRoutes();
    }

    startRoutes() {
        this.router.post(`${this.path}/register`, multerStorage, this.register);
        this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.login);
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

    private login = async (request: Request, response: Response, next: NextFunction) => {
        const loginDto: LoginDto = request.body;
        const userLogin = await this.userModel.findOne({username: loginDto.username});
        if (userLogin) {
            const token = this.authService.createToken(userLogin);
            response.json({
                token,
                user: userLogin
            })
        } else {
            next(new HttpException(400, 'Credentials invalid'));
        }
    }
}

export default AuthController;