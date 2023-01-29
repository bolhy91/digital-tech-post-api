import Index from "./index";
import AuthController from "./auth/auth.controller";


const api = new Index([
    new AuthController()
])

api.startExpress();