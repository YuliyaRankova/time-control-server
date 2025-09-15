import {Employee, EmployeeDto, SavedFiredEmployee} from "../model/Employee.js";
import bcrypt from "bcryptjs";
import {Roles} from "./appTypes.js";
import {v4 as uuidv4} from 'uuid';
import {HttpError} from "../errorHandler/HttpError.js";
import {CrewShift} from "../model/Shift.js";
import {FiredEmployeeModel} from "../model/EmployeeMongooseModel.js";

export const convertEmployeeDtoToEmployee = (dto:EmployeeDto):Employee =>{
    const employee:Employee = {
        firstName: dto.firstName,
        lastName: dto.lastName,
        _id: dto.id,
        hash: bcrypt.hashSync(dto.password, 10),
        table_num: generateTabNumber(),
        roles: Roles.CREW
    }
    return employee;
};

function generateTabNumber() {
    return uuidv4();
};

export const checkFiredEmployees = async(id:string) => {
    if(await FiredEmployeeModel.findOne({id}))
        throw new HttpError(409,  "This employee was fired");
};

export const convertEmployeeToFiredEmployee = (emp:Employee) =>{
    const fired:SavedFiredEmployee = {
        fireDate: new Date().toDateString(),
        firstName: emp.firstName,
        lastName: emp.lastName,
        _id: emp._id,
        table_num: emp.table_num
    }
    return fired;
};

export const checkRole = (role:string) => {
    const newRole = Object.values(Roles).find(r => r === role)
    if(!newRole) throw new HttpError(400, "Wrong role!");
    return newRole;
};

export const getMonthHours = (shifts: CrewShift[]) => {
    return shifts.map(item => item.shiftDuration).reduce((acc, item) => acc+item, 0);
};

export const generateShiftId = () => Math.trunc(Math.random()*10000) + 1;

export const formatTimeStamp = (timestamp:number)=>{
    const date = new Date(timestamp);
    const formattedTimestamp = date.toISOString().replace("T", " ").replace(/\.\d+Z$/, "");
    return formattedTimestamp
};