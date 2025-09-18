import * as mongoose from "mongoose";

const ShiftMongoSchema = new mongoose.Schema({
    _id: {type:Number,require:true},
    startShift:{type:Number,require:true}, //timestamp shift start time
    finishShift: {type:Number,default:null},  //timestamp shift finish time
    table_num: {type:String, require:true},
    shiftDuration: {type:Number,default:0},
    breaks: {type:Number,default:0}, // решили, что это просто накопление перерывов, длительность которых фиксирована и может быть  = 15 или 30
    сorrect: {type:String, default:null}, //mng table_num
    monthHours: {type:Number,default:0}
});

export const ShiftModel = mongoose.model("Shift", ShiftMongoSchema, "shifts_collection");