import {ObjectSchema} from 'joi'
import {Response, Request,NextFunction} from "express";
import {HttpError} from "../errorHandler/HttpError.js";
import {StringSchema} from "./joiSchemas.js";


export const bodyValidation = (schema:ObjectSchema | StringSchema) =>
    (req:Request, res:Response, next:NextFunction) => {

        if(!req.body) throw new HttpError(400, "Body required")
        const {error} = schema.validate(req.body)
        if(error) throw new HttpError(400, error.message)
        next();
    };
