import {User} from "../../user/user.interface";
import { Request } from 'express';

interface RequestByUser extends Request {
    user: User;
}

export default RequestByUser;