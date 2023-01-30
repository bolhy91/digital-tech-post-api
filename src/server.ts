import Index from "./index";
import AuthController from "./auth/auth.controller";
import UserController from "./user/user.controller";
import PostController from './post/post.controller';

const api = new Index([
    new AuthController(),
    new UserController(),
    new PostController()
])

api.startExpress();