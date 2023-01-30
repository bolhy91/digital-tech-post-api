import Index from "./index";
import AuthController from "./auth/auth.controller";
import UserController from "./user/user.controller";


const api = new Index([
    new AuthController(),
    new UserController()
])

api.startExpress();