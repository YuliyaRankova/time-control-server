import {Response, Request,NextFunction} from "express";
import {HttpError} from "../errorHandler/HttpError.js";
import Joi from "joi";

export const queryValidation = (schema:Joi.StringSchema) =>
    (req:Request, res:Response, next:NextFunction)=>{

        if(!req.query.id) throw new HttpError(400, "No Id in request");

        const{error} = schema.validate(req.query.id);
        if(error) throw new HttpError(400, error.message);
        next();
    };