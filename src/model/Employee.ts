import {Roles} from "../utils/appTypes.js";

export type EmployeeDto = {
    firstName:string,
    lastName:string,
    password:string,
    id:string
};

export type Employee = {
    firstName: string,
    lastName: string,
    _id: string,
    table_num: string,
    hash: string,
    roles: Roles
};

export type SavedFiredEmployee = {
    firstName: string,
    lastName: string,
    _id: string,
    table_num:string,
    fireDate?:string,
};

export type UpdateEmployeeDto = {
    firstName: string,
    lastName: string,
};

// export type SavedFiredEmployee = Employee | FiredEmployee