import {User} from "./user.interface";
import {PostStatus} from "../enums/post-status.enum";

export interface Post {
    image?: string;
    message: string;
    likes?: Array<User>;
    author: User;
    create_at: Date;
    location: string;
    status: PostStatus
}