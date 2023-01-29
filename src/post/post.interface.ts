import {PostStatus} from "../shared/enums/post-status.enum";
import {User} from "../user/user.interface";

export interface Post {
    image?: string;
    message: string;
    likes?: Array<User>;
    author: User;
    create_at: Date;
    location: string;
    status: PostStatus
}