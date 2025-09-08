import * as mongoose from "mongoose";
import {Roles} from "../utils/wtTypes.js";
import {v4 as uuidv4} from "uuid";

const employeeMongoSchema = new mongoose.Schema({
    _id:{type: String, length:9, required: true},
    table_num:{type: String, default: () => uuidv4()},
    hash:{type: String, required: true},
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    hiredDate:{type:Number, required:true},
    role:{type: String, enum: Roles, required: true}
});
export const EmployeeModel = mongoose.model('Employee', employeeMongoSchema, "employee_collection");

const firedEmployeeMongoSchema = new mongoose.Schema({
    _id:{type: String, length:9, required: true},
    status:{type:String, required:true},
    // firstName:{type: String, required: true},
    // lastName:{type: String, required: true},
    firedDate:{type:Number, required:true},
    hiredDate:{type:Number, required:true},
    role:{type: String, enum: Roles, required: true}
});
export const FiredEmployeeModel = mongoose.model("FiredEmployee", firedEmployeeMongoSchema, "fired_employee_collection");
