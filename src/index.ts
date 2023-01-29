import * as dotenv from 'dotenv';

dotenv.config()
import express from 'express';
import cors from 'cors';
import {ATLAS_URI, corsOptions, PORT} from "./config/config";
import mongoose from "mongoose";

const app = express();

/**
 ## Configuration ##
 **/
app.use(cors(corsOptions));
app.use(express.json());

app.get('/api', (_, res) => {
    res.send('the api run');
});

mongoose.set('strictQuery', false);
mongoose.connect(ATLAS_URI).then(() => {
    console.log('Connected to database ')
}).catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
})

app.listen(PORT, () => {
    return console.log(`server is listening on ${PORT}`);
});


export {app}