import {Request, Response} from 'express';
import {Employee, EmployeeDto} from "../model/Employee.js";
import {convertEmployeeDtoToEmployee} from "../utils/tools.js";
import {accountServiceMongo} from "../services/accountServiceImplMongo.js";
import {FiredEmployeeModel} from "../model/EmployeeMongooseModel.js";

export const addAccount = async (req: Request, res: Response) => {
    const body = req.body as EmployeeDto;
    const employee: Employee = convertEmployeeDtoToEmployee(body);

    await accountServiceMongo.hireEmployee(employee);
    const firedEmpl = await FiredEmployeeModel.findById(employee._id);
    if(firedEmpl) {
        res.json({
            employee,
            message:"Employee worked in company before"
        })
    }else{
        res.json(employee);
    }
};

export const removeAccount = async (req: Request, res: Response) => {
    const {id} = req.query;
    const firedEmployee = await accountServiceMongo.fireEmployee(id as string);
    res.json(firedEmployee);
};

export const updateEmployee = (req: Request, res: Response) =>{

};

export const changePassword = (req: Request, res: Response) =>{

};

export const getAccountById = async (req: Request, res: Response) => {
    const {id} = req.query;
    const account = await accountServiceMongo.getEmployeeById(id as string);
    res.json(account);
};

export const getAllAccounts = async (req: Request, res: Response) => {
    const employees = await accountServiceMongo.getAllEmployees();
    res.json(employees);
};

export const setRole = (req: Request, res: Response) =>{

};