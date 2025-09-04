import express from "express";
import * as controller from "../controllers/AccountController.js";
import {bodyValidation} from "../validation/bodyValidation.js";
import {queryValidation} from "../validation/queryValidation.js";
import {
    ChangePasswordDtoSchema,
    EmployeeDtoSchema, EmployeeIdQuerySchema,
    SetRoleSchema
} from "../validation/joiSchemas.js";

export const accountRouter = express.Router();

accountRouter.post('/', bodyValidation(EmployeeDtoSchema), controller.addAccount);
accountRouter.delete('/', queryValidation(EmployeeIdQuerySchema), controller.removeAccount);
accountRouter.patch('/update', bodyValidation(EmployeeDtoSchema), controller.updateEmployee);
accountRouter.patch('/password', bodyValidation(ChangePasswordDtoSchema), controller.changePassword);
accountRouter.get('/', queryValidation(EmployeeIdQuerySchema), controller.getAccountById);
accountRouter.get('/employees', controller.getAllAccounts);
accountRouter.put('/role', queryValidation(EmployeeIdQuerySchema), bodyValidation(SetRoleSchema), controller.setRole);
