import { Application } from "express";
import cors from 'cors';
import bodyParser from 'body-parser';

import authRouter from '../routes/auth';
import deviceRouter from '../routes/device';

export function applyMiddleware(app: Application): void {

    // Add all the middlewares here
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


    // Consuming API routes
    app.use("/api/device", deviceRouter);
    app.use("/api/user/", authRouter);
}