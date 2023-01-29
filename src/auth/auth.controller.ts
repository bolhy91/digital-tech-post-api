import Controller from "../shared/interfaces/controller.interface";
import {NextFunction, Router} from "express";
import userModel from "../user/user.model";

class AuthController implements Controller {
    private path: string = '/auth';
    private router: Router = Router();
    private user = userModel;

    constructor() {
    }

    startRoutes() {
    }

    private register = async (request: Request, response: Response, next: NextFunction) => {
        
    }
}