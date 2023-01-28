import {Role} from "../enums/role.enum";

export interface User {
    avatar?: string;
    username: string;
    name: string;
    role: Role
}