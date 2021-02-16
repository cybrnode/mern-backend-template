import fs from 'fs';
import path from 'path';
import winston from "winston";

import {LoggerConfig, LoggingOptions, ServerConfig} from "../config/config";


export function createLogger(dedicatedFile: string) {
    const loggerConfig: LoggerConfig = LoggerConfig.getConfig();
    const LOGGING_LEVEL: string = loggerConfig.loggingLevel;

    let loggerTransports: winston.transport[] = [];
    
    loggerTransports.push(new winston.transports.Console({
        level: LOGGING_LEVEL
    }));

    if (loggerConfig.combined){
        loggerTransports.push(new winston.transports.File({
            filename: loggerConfig.combinedFileName,
            level: LOGGING_LEVEL
        }));
    }

    if (loggerConfig.dedicated && dedicatedFile){
        loggerTransports.push(new winston.transports.File({
            level: LOGGING_LEVEL,
            filename: dedicatedFile, // TODO: dedicated file check
        }));
    }

    /*
    if (loggerConfig.networked && loggerConfig != null){
        const serverURLs: string[] = loggerConfig.serverURL;
        // TODO: fix things here
        serverURLs.forEach(function (url: string) {
            loggerTransports.push(new winston.transports.Http({
                level: LOGGING_LEVEL,
                path: url
            }));
        })
    }
    */

    let winstonLogger: winston.Logger = winston.createLogger({
        level: LOGGING_LEVEL,
        format: winston.format.simple(),
        transports: loggerTransports
    });
    return winstonLogger;
}