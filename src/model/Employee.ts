import {Roles} from "../utils/wtTypes.js";

export type EmployeeDto = {
    firstName:string,
    lastName:string,
    password:string,
    id:string
};

export type Employee = {
    _id:string,
    passHash:string,
    firstName:string,
    lastName:string,
    hiredDate:Date,
    role:Roles
};

export type FiredEmployee ={
    _id:string,
    status:string,
    // firstName:string,
    // lastName:string,
    firedDate:Date,
    hiredDate:Date,
    role:Roles
};

export type SavedFiredEmployee = Employee | FiredEmployee