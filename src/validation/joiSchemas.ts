import Joi from 'joi'
import {Roles} from "../utils/appTypes.js";

//================================== Accounting Schemas ==========================
export const EmployeeDtoSchema = Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    password: Joi.string().alphanum().min(8).required(),
    // password:Joi.string().min(8).max(32).pattern(/^[\S]+$/).required(),
    id: Joi.string().length(9).required(),
});

export const ChangePasswordDtoSchema = Joi.object({
    id:Joi.string().length(9).required(),
    newPassword:Joi.string().min(8).max(32).pattern(/^[\S]+$/).required()
});

export const UpdateEmployeeDtoSchema = Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
});

export const EmployeeIdQuerySchema = Joi.object({
    id:Joi.string().length(9).required()
});

export const SetRolesSchema = Joi.object({
    role: Joi.string().valid(...Object.values(Roles)).required()
});

//================================== Shift Schemas ==========================

export const TabNumSchema = Joi.object({
    tabNum:Joi.string().required()
});

export const BreakSchema = Joi.object({
    tabNum:Joi.string().required(),
    breakDur:Joi.number().valid(15, 30).required()
});

export const CorrectionSchema = Joi.object({
    tabNumCrew:Joi.string().required(),
    tabNumMng: Joi.string().required(),
    start:Joi.number().required(),
    finish:Joi.number().required(),
    date:Joi.number().required()
});


