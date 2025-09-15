import express from "express";
import * as controller from "../controllers/AccountController.js";
import {bodyValidation} from "../validation/bodyValidation.js";
import {queryValidation} from "../validation/queryValidation.js";
import {
    ChangePasswordDtoSchema,
    EmployeeDtoSchema, EmployeeIdQuerySchema, SetRolesSchema, UpdateEmployeeDtoSchema,
} from "../validation/joiSchemas.js";

export const accountRouter = express.Router();

accountRouter.post('/', bodyValidation(EmployeeDtoSchema), controller.hireEmployee);
accountRouter.delete('/', queryValidation(EmployeeIdQuerySchema), controller.fireEmployee);
accountRouter.patch('/update', queryValidation(EmployeeIdQuerySchema), bodyValidation(UpdateEmployeeDtoSchema), controller.updateEmployee);
accountRouter.patch('/password', bodyValidation(ChangePasswordDtoSchema), controller.changePassword);
accountRouter.get('/', queryValidation(EmployeeIdQuerySchema), controller.getEmployeeById);
accountRouter.get('/employees', controller.getAllEmployees);
accountRouter.put('/role', queryValidation(EmployeeIdQuerySchema), bodyValidation(SetRolesSchema),controller.setRole);

