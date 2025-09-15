import * as mongoose from "mongoose";
import {Roles} from "../utils/appTypes.js";
import {v4 as uuidv4} from "uuid";

export const EmployeeMongoSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    _id: {type: String, required: true},
    table_num:{type:String, required: true},
    roles:{type:String, enum: Roles, required: true}, // [String] ?
    hash:{type:String, required: true},
    salary:{type:Number, min:0},
}, {versionKey:false})

export const EmployeeModel = mongoose.model('Employees', EmployeeMongoSchema, "employees_accounting");

export const FiredEmployeeMongoSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    _id: {type: String, required: true},
    table_num:{type:String, required: true},
    fireDate: {type:String, required: true}
}, {versionKey:false});

export const FiredEmployeeModel = mongoose.model("Fired", FiredEmployeeMongoSchema, "fired_employee_collection");