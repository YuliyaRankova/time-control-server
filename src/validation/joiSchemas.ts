import Joi from 'joi'
import {Roles} from "../utils/wtTypes.js";

//================================== Accounting Schemas ==========================
export const EmployeeDtoSchema = Joi.object({
    firstName:Joi.string().min(2).required(),
    lastName:Joi.string().min(2).required(),
    password:Joi.string().min(8).max(32).pattern(/^[\S]+$/).required(),
    id:Joi.string().length(9).required()
});

export const ChangePasswordDtoSchema = Joi.object({
    id:Joi.string().length(9).required(),
    newPassword:Joi.string().min(8).max(32).pattern(/^[\S]+$/).required()
});

export const EmployeeIdQuerySchema = Joi.object({
    id:Joi.string().length(9).required()
});

export const SetRoleSchema = Joi.object({
    role: Joi.string().valid(...Object.values(Roles)).required()
});

//================================== Shift Schemas ==========================
export const TabNumSchema = Joi.object({
    tab_num:Joi.string().required()
});

export const BreakSchema = Joi.object({
    tab_num:Joi.string().required(),
    shift_break: Joi.number().required()
});

export const CorrectionSchema = Joi.object({
    tab_n_crew:Joi.string().required(),
    tab_n_mng: Joi.string().required(),
    start:Joi.number().required(),
    finish:Joi.number().required(),
    date:Joi.number().required()
});


