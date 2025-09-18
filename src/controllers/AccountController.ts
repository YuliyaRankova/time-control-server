import {Request, Response} from 'express';
import {Employee, EmployeeDto, UpdateEmployeeDto} from "../model/Employee.js";
import {checkRole, convertEmployeeDtoToEmployee, formatTimeStamp} from "../utils/tools.js";
import {accountService} from "../services/accountingService/accountServiceImplMongo.js";
import {logger} from "../Logger/winston.js";


export const hireEmployee = async (req: Request, res: Response) => {
    const body = req.body;
    const emp: Employee = convertEmployeeDtoToEmployee(body as EmployeeDto);
    const result = await accountService.hireEmployee(emp);
    res.status(201).json(result);
};

export const fireEmployee = async (req: Request, res: Response) => {
    const query_id = req.query.id;
    const result = await accountService.fireEmployee(query_id as string);
    res.json(result);
};

export const updateEmployee = async (req: Request, res: Response) => {
    const query_id = req.query.id;
    const newData = req.body;
    const result = await accountService.updateEmployee(query_id as string, newData as UpdateEmployeeDto);
    res.json(result);
};

export const changePassword = async (req: Request, res: Response) => {
    const {id, newPassword} = req.body;
    logger.debug(`id: ${id}, newPassword: ${newPassword}`)
    await accountService.changePassword(id, newPassword);
    res.status(200).send();
};

export const getEmployeeById = async (req: Request, res: Response) => {
    const query_id = req.query.id;
    const result = await accountService.getEmployeeById(query_id as string);
    res.json(result);
};

export const getAllEmployees = async (req: Request, res: Response) => {
    const employees = await accountService.getAllEmployees();
    res.json(employees);
};

export const setRole = async (req: Request, res: Response) => {
    const {id} = req.query;
    const role = checkRole(req.body.role);
    logger.debug(`role: ${role}`);
    const result = await accountService.setRole(id as string, role);
    res.json(result);
};