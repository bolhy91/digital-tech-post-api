import {Router} from "express";

interface Controller {
    path: string,
    router: Router

    startRoutes()
}

export default Controller