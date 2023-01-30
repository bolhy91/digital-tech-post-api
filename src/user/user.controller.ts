import Controller from "../shared/interfaces/controller.interface";
import {NextFunction, Router, Request, Response} from "express";
import userModel from "./user.model";

class UserController implements Controller {
    public path: string = '/users';
    public router: Router = Router();
    private userModel = userModel

    constructor() {
        this.startRoutes();
    }

    startRoutes() {
        this.router.get(`${this.path}/:id`, this.getUserById);
    }

    private getUserById = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const query = await this.userModel.findById(id);
        if (query) {
            response.send(query);
        } else {
            next(Error("User Not Found"));
        }
    }
}