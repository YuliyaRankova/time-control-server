import * as mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const ShiftMongoSchema = new mongoose.Schema({
    _tab_num: {type: String, required:true},
    shift_id: {type: Number, required:true}, // generate?
    startShift: {type: Number, required:true},//timestamp shift start time
    finishShift: {type: Number, default:null},
    shiftDuration: {type: Number, required:true}, // store in minutes?
    breaks: {type: Number, required:true}, //15 или 30
    сorrect: {type: String, default:null},
    monthHours: {type: Number, required:true} // накопление рабочего времени с начала месяца
});

export const ShiftModel = mongoose.model("Shift", ShiftMongoSchema, "shift_collection");