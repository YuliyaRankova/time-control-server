import {Employee, EmployeeDto} from "../model/Employee.js";
import bcrypt from "bcryptjs";
import {Roles} from "./appTypes.js";
import {v4 as uuidv4} from 'uuid';
import {HttpError} from "../errorHandler/HttpError.js";

export const convertEmployeeDtoToEmployee = (dto:EmployeeDto):Employee =>{
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(dto.password, salt);
    const employee:Employee = {
        _id:dto.id,
        table_num: generateTabNumber(),
        // table_num: generateTabNumber(), -> find plugin for generating tab_num like uuidv4()
        hash:bcrypt.hashSync(dto.password, 10),
        firstName:dto.firstName,
        lastName:dto.lastName,
        hiredDate: Date.now(),
        role:Roles.CREW
    }
    return employee;
};

function generateTabNumber() {
    return uuidv4();
};

export const formatTimeStamp = (timestamp:number)=>{
    const date = new Date(timestamp);
    const formattedTimestamp = date.toISOString().replace("T", " ").replace(/\.\d+Z$/, "");
    return formattedTimestamp
};

export const checkRole = (role:string) => {
    const newRole = Object.values(Roles).find(r => r === role)
    if(!newRole) throw new HttpError(400, "Wrong role!");
    return newRole;
};

export const generateShiftId = (date: Date): number => {
    const newShift = Number(date.toISOString().slice(0, 10).replace(/-/g, ''));
    return newShift;
};

export const getDuration = (startTime: number) =>{
    const finishTime = Date.now();
    const duration = Math.floor((finishTime - startTime) / 1000 / 60);
    return duration;
};

// export const checkFiredEmployees = async (id: string) => {
//     return async (req: Request, res: Response) => {
//         const firedEmpl = await FiredEmployeeModel.findById(emplId);
//         if (firedEmpl)
//             res.send("Employee worked in company before");
//     }
// };
