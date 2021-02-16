import express, { NextFunction, Request, Response } from "express"
import {applyMiddleware} from './api/middleware/middleware';

import {ServerConfig} from './config/config';
import {createLogger} from './logger/logger';


const logger = createLogger(__filename);

export async function initServer() {
    const serverConfig: ServerConfig = ServerConfig.getConfig();
    const SERVER_NAME: string = serverConfig.name;
    const HOST: string = serverConfig.host;
    const PORT: number = serverConfig.port;

    const app = express();
    applyMiddleware(app);

    const server = app.listen(PORT, HOST, () => {
        logger.info("--------------> Server started");
        logger.info(`Server Type:  ${SERVER_NAME}`);
        logger.info(`Local url:    http://${HOST}:${PORT}`);
        logger.info(`Started at:   ${(new Date()).toString()}\n`);
    });

    return server;
}