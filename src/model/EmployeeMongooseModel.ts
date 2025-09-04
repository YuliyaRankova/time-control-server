import * as mongoose from "mongoose";
import {Roles} from "../utils/wtTypes.js";

const employeeMongoSchema = new mongoose.Schema({
    _id:{type: String, length:9, required: true},
    passHash:{type: String, required: true},
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    hiredDate:{type:Date, required:true},
    role:{type: String, enum: Roles, required: true}
});
export const EmployeeModel = mongoose.model('Employee', employeeMongoSchema, "employee_collection");

const firedEmployeeMongoSchema = new mongoose.Schema({
    _id:{type: String, length:9, required: true},
    status:{type:String, required:true},
    // firstName:{type: String, required: true},
    // lastName:{type: String, required: true},
    firedDate:{type:Date, required:true},
    hiredDate:{type:Date, required:true},
    role:{type: String, enum: Roles, required: true}
});
export const FiredEmployeeModel = mongoose.model("FiredEmployee", firedEmployeeMongoSchema, "fired_employee_collection");
