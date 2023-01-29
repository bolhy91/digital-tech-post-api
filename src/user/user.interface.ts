import {Role} from "../shared/enums/role.enum";

export interface User {
    _id: string;
    avatar?: string;
    username: string;
    name: string;
    role: Role
}