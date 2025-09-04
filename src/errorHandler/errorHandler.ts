import {Request, Response, NextFunction} from "express";
import {HttpError} from "./HttpError.ts";

export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) =>{
    console.error("Error caught by middleware:");
    console.error("Name:", err.name);
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    console.error("Instance of HttpError:", err instanceof HttpError);

    if(err instanceof HttpError)
        res.status(err.status).send(err.message)
    else res.status(500).send("Unknown server error!")
};