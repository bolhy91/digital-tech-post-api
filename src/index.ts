import * as dotenv from 'dotenv';

dotenv.config()
import express from 'express';
import cors from 'cors';
import {ATLAS_URI, corsOptions, PORT} from "./config/config";
import mongoose from "mongoose";
import AuthController from 'auth/auth.controller'
import Controller from 'shared/interfaces/controller.interface';

class Index {
    public api: express.Application;

    constructor(controller: Controller[]) {
        this.api = express();
        this.connectMongoDB();
        this.startMiddlewares();
        this.startControllers(controller);
    }

    startExpress() {
        this.api.listen(PORT, () => {
            return console.log(`server is listening on ${PORT}`);
        });
    }

    private startMiddlewares() {
        //Configuration
        this.api.use(cors(corsOptions));
        this.api.use(express.json());
    }

    private startControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.api.use('/api', controller.router);
        });
    }

    private connectMongoDB() {
        mongoose.set('strictQuery', false);
        mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
            console.log('Connected to database ')
        }).catch((err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })
    }
}

export default Index;