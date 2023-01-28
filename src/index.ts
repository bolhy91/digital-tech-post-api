import express from 'express';
import {PORT} from "./config/config";

const api = express()

api.get('/', (_, res) => {
    res.send('the api run');
});

api.listen(PORT, () => {
    return console.log(`server is listening on ${PORT}`);
});