import {Request, Response, NextFunction} from "express";
import {HttpError} from "./HttpError.ts";
import {logger} from "../Logger/winston.js";

export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) =>{
    if(err instanceof HttpError){
        logger.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${err.status} - ${err.message}`);
        res.status(err.status).send(err.message);
    }
    else{
        logger.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - Unknown server error!`);
        res.status(500).send("Unknown server error!");
    }
};