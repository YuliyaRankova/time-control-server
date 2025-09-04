import {Employee, EmployeeDto} from "../model/Employee.js";
import bcrypt from "bcryptjs";
import {Roles} from "./wtTypes.js";

export const convertEmployeeDtoToEmployee = (dto:EmployeeDto):Employee =>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(dto.password, salt);

    return {
        _id:dto.id,
        passHash:hash,
        firstName:dto.firstName,
        lastName:dto.lastName,
        hiredDate: new Date(),
        role:Roles.CREW
    }
};