import Joi from 'joi'
import {Roles} from "../utils/wtTypes.js";

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

export const EmployeeIdQuerySchema = Joi.string().length(9).required();

export const SetRoleSchema = Joi.string<Roles>();

