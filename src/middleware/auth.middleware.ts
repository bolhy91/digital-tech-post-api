import {NextFunction, Request} from 'express';
import * as jwt from 'jsonwebtoken';
import userModel from '../user/user.model';
import HttpException from "../shared/exceptions/http-exception";
import RequestByUser from "../shared/interfaces/request-by-user.interface";

async function authMiddleware(request: RequestByUser, response: Response, next: NextFunction) {
    if (request.headers.authorization) {
        const token = request.headers.authorization.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        try {
            const verification = jwt.verify(token, secret) as { _id: string };
            const id = verification._id;
            const user = await userModel.findById(id);
            if (user) {
                request.user = user;
                next();
            } else {
                next(new HttpException(401, 'Wrong authentication token'));
            }
        } catch (error) {
            next(new HttpException(401, `Wrong authentication token: ${error}`));
        }
    } else {
        next(new HttpException(403, 'Tu peticion no tiene cabecera de autorizacion'));
    }
}

export default authMiddleware;