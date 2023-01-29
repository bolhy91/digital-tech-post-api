import userModel from "../user/user.model";
import {RegisterDto} from "./dto/register.dto";
import * as jwt from 'jsonwebtoken';
import User from '../user/user.interface';

class AuthService {
    userModel = userModel

    async register(data: RegisterDto) {
        if (await this.userModel.findOne({username: data.username})) {
            throw new Error('Username already exists');
        }
        const user = await this.userModel.create({...data});
        const token = this.createToken(user);
        return {
            token: token,
            user
        }
    }

    createToken(user: User): TokenValue {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken = {
            _id: user._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, {expiresIn}),
        };
    }
}

export default AuthService