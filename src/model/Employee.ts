import {Roles} from "../utils/wtTypes.js";

export type EmployeeDto = {
    firstName:string,
    lastName:string,
    password:string,
    id:string
};

export type Employee = {
    _id:string,
    table_num: string,
    // hash:string,
    hash:string,
    firstName:string,
    lastName:string,
    hiredDate:number,
    role:Roles
};

export type FiredEmployee ={
    _id:string,
    status:string,
    // firstName:string,
    // lastName:string,
    firedDate:number,
    hiredDate:number,
    role:Roles
};

// export type SavedFiredEmployee ={
//     firstName:string,
//     lastName:string,
//     _id:string,
//     table_num: string,
//     fireDate?:string
// };

export type SavedFiredEmployee = Employee | FiredEmployee