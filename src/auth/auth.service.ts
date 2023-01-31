import userModel from "../user/user.model";
import {RegisterDto} from "./dto/register.dto";
import * as jwt from 'jsonwebtoken';
import {TokenValue} from "../shared/interfaces/token-value.interface";
import {User} from "../user/user.interface";
import {JWT_SECRET} from "../config/config";
import HttpException from "../shared/exceptions/http-exception";

class AuthService {
    userModel = userModel

    async register(data: RegisterDto) {
        if (await this.userModel.findOne({username: data.username})) {
            throw new HttpException(404, 'Username already exists')
        }
        const user = await this.userModel.create({...data});
        const token = this.createToken(user);
        return {
            token,
            user
        }
    }

    createToken(user: User): TokenValue {
        const expiresIn = 60 * 60; // an hour
        const dataStoredInToken = {
            _id: user._id,
            role: user.role
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, JWT_SECRET, {expiresIn}),
        };
    }
}

export default AuthService