import {Request, Response} from 'express';
import {Employee, EmployeeDto} from "../model/Employee.js";
import {checkRole, convertEmployeeDtoToEmployee, formatTimeStamp} from "../utils/tools.js";
import {accountService} from "../services/accountServiceImplMongo.js";
import {EmployeeModel, FiredEmployeeModel} from "../model/EmployeeMongooseModel.js";


export const hireEmployee = async (req: Request, res: Response) => {
    const body = req.body as EmployeeDto;
    const employee: Employee = convertEmployeeDtoToEmployee(body);
    await accountService.hireEmployee(employee);

    const firedEmpl = await FiredEmployeeModel.findById(employee._id);
    if(firedEmpl) {
        res.json({employee, message:"Employee worked in company before"});
    }else{
        res.json(employee);
    }
};

export const fireEmployee = async (req: Request, res: Response) => {
    const {id} = req.query;
    const firedEmployee = await accountService.fireEmployee(id as string);
    res.json(firedEmployee);
};

export const updateEmployee = (req: Request, res: Response) =>{

};

export const changePassword = (req: Request, res: Response) =>{

};

export const getAccountById = async (req: Request, res: Response) => {
    const {id} = req.query;
    const account = await accountService.getEmployeeById(id as string);

    const employee = {...account, hiredDate: formatTimeStamp(account.hiredDate)};
    res.json(employee);
};

export const getAllAccounts = async (req: Request, res: Response) => {
    const employees = await accountService.getAllEmployees();
    res.json(employees);
};

export const setRole = async (req: Request, res: Response) => {
    const {id} = req.query;
    const role = checkRole(req.body.role);
    const employee = await accountService.setRole(id as string, role);
    res.json(employee);
};