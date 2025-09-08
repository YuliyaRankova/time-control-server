import {Response, Request,NextFunction} from "express";
import {HttpError} from "../errorHandler/HttpError.js";
import Joi, {ObjectSchema} from "joi";

export const queryValidation = (schema:ObjectSchema) =>
    (req:Request, res:Response, next:NextFunction)=>{
        const queryParam = req.query;
        if(!queryParam) throw new HttpError(400, `No ${queryParam} in request`);

        const{error} = schema.validate(req.query);
        if(error) throw new HttpError(400, error.message);
        next();
    };