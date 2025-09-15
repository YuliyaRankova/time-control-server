import {ShiftControlService} from "./shiftControlService.js";
import {CrewShift, TabNumTime} from "../../model/Shift.js";
import {HttpError} from "../../errorHandler/HttpError.js";
import {ShiftModel} from "../../model/ShiftMongooseModel.js";
import {generateShiftId, getMonthHours} from "../../utils/tools.js";
import {consoleLogger, logger} from "../../Logger/winston.js";

export class ShiftControlImplMongo implements ShiftControlService{

    async startShift(tabNum: string): Promise<TabNumTime> {
        const shifts = await ShiftModel.find({table_num:tabNum}).exec();
        if(!shifts) throw new HttpError(404, "Shift not found");

        let monthHours = 0;
        const currentTime = new Date().getTime();

        if(shifts.length !== 0){
            const lastShift = shifts[shifts.length -  1];

            if(lastShift.finishShift == null){
                logger.error(`${new Date().toISOString()} => Previous shift not closed, 409 Conflict`);
                throw new HttpError(409, "Previous shift not closed");
            }
            // if(currentTime - lastShift.finishShift < (configuration.minTimeBetweenShifts * 1000 * 3600))
            //     throw new HttpError(409, "Shifts too close");
            monthHours = getMonthHours(shifts as unknown as CrewShift[])
        };
        const newShift:CrewShift = {
            _id: generateShiftId(),
            table_num: tabNum,
            startShift: currentTime,
            finishShift: null,
            breaks: 0,
            shiftDuration: 0,
            monthHours,
            сorrect: null
        };
        const newShiftDoc = new ShiftModel(newShift);
        await newShiftDoc.save();
        return {tabNum, time: new Date(currentTime).toTimeString()}
    };


    async finishShift(tabNum: string): Promise<TabNumTime> {
        const shiftDoc = await ShiftModel.findOne({table_num:tabNum, finishShift:null}).exec();
        if(!shiftDoc) throw new HttpError(404, "Shift not found");

        const currentTime = new Date().getTime();
        const shift = await ShiftModel.findOneAndUpdate({table_num: tabNum, finishShift:null},
            [{$set: {finishShift: currentTime,
                    shiftDuration: {$subtract: [currentTime,'$startShift']}}}
            ], {new: true}
        ).exec();
        if(!shift) throw new HttpError(409, "Opened shift not found")
        return {tabNum, time: new Date(currentTime).toTimeString()}
    };

    async setBreak(tabNum: string, breakDur: number): Promise<void> {
        const shiftDoc = await ShiftModel.findOne({table_num: tabNum, finishShift:null}).exec();
        if (!shiftDoc) throw new HttpError(404, `Employee with tab num: ${tabNum} not found`);

        const updated = await ShiftModel.findOneAndUpdate(
            {table_num: tabNum},
            {$inc: {breaks: breakDur}},
            {new:true}
        ).exec();
        consoleLogger.info(`${updated}`);
    };


    async correctShift(tabNumCrew: string, tabNumMng: string, start: number, finish: number, date: number): Promise<void> {

    };


    async getCurrentShiftStaff(): Promise<CrewShift[]> {
        const staffDocs = await ShiftModel.find().lean().exec();

        const currStaff: CrewShift[] = staffDocs.filter(emp => emp.finishShift === null)
            .map(emp =>({
                 ...emp,
                 _id: emp._id as number,
                 table_num: emp.table_num as string,
                 startShift: emp.startShift as number,
        }));
        return currStaff;
    };


    async getEmployeeShift(tabNum: string): Promise<CrewShift> {
        const shiftDoc = await ShiftModel.findOne({table_num: tabNum}).lean().exec();
        if(!shiftDoc) throw new HttpError(404, `Employee with tab num: ${tabNum} not found`);

        return shiftDoc as CrewShift;
    };

};

export const shiftService = new ShiftControlImplMongo();


//     async setBreak(tab_n: string, shift_break: number): Promise<void> {
//     const shiftDoc = await ShiftModel.findOne({_tab_num: tab_n, finishShift: null}).exec();
//     if (!shiftDoc) throw new HttpError(404, `Active shift for: ${tab_n} not found`);
//
//     if(shiftDoc.shiftDuration === ShiftDur.SHIFT_240) throw new HttpError(409, "No breaks provided for this shift");
//
//     if(shiftDoc.shiftDuration === ShiftDur.SHIFT_360 && !shiftDoc.breaks) {
//         const updated = await ShiftModel.findOneAndUpdate(
//             {_tab_num: tab_n, finishShift: null},
//             {$set: {breaks: Breaks.BREAK_15}},
//             {new:true}
//         ).exec();
//         console.log(updated)
//     };
//     if(shiftDoc.shiftDuration === ShiftDur.SHIFT_480 && shiftDoc.breaks < 30){
//         const updated = await ShiftModel.findOneAndUpdate(
//             {_tab_num: tab_n, finishShift: null},
//             {$inc: {breaks: shift_break}},
//             {new:true}
//         ).exec();
//         console.log(updated)
//     }else{
//         throw new HttpError(409, "No more breaks for this shift")
//     };
// };

// async correctShift(tab_n_crew: string, tab_n_mng: string, shift_id: number): Promise<void> {
//     const shiftDoc = await ShiftModel.findOne({_tab_num: tab_n_crew}).exec();
//     if (!shiftDoc) throw new HttpError(404, `Employee with tab num: ${tab_n_crew} not found`);
//
//     const duration = getDuration(shiftDoc.startShift);
//     if(shiftDoc.shift_id === shift_id && shiftDoc.finishShift === null && duration > ShiftDur.SHIFT_360){
//         const correctedFinishShift = shiftDoc.startShift + ShiftDur.SHIFT_360*60*1000;
//
//         await ShiftModel.findOneAndUpdate(
//             {_tab_num: tab_n_crew},
//             {$set: {finishShift: correctedFinishShift,
//                     сorrect: tab_n_mng,
//                     shiftDuration: Math.floor((correctedFinishShift - shiftDoc.startShift) / 1000 / 60)}},
//             {new: true}
//         ).exec();
//     }
// };

