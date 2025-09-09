import {ShiftControlService} from "./shiftControlService.js";
import {CurrentCrewShift, Shift} from "../model/CrewShift.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {ShiftModel} from "../model/ShiftMongooseModel.js";
import {formatTimeStamp, generateShiftId, getDuration} from "../utils/tools.js";
import {Breaks, ShiftDur} from "../utils/appTypes.js";

export class ShiftControlImplMongo implements ShiftControlService{

    async startShift(tab_n: string, shift_dur:number): Promise<Shift> {
        const crewShift = await ShiftModel.findOne({_tab_num:tab_n}).exec();
        if(crewShift && crewShift.startShift && crewShift.finishShift === null) throw new HttpError(404,
            `Employee with tab num: ${tab_n} already started the shift at ${formatTimeStamp(crewShift.startShift)}`);

        const newShiftDoc = new ShiftModel({
            _tab_num:tab_n,
            shift_id: generateShiftId(new Date()),
            startShift: Date.now(),
            finishShift: null,
            shiftDuration: shift_dur,
            breaks: 0,
            correct: null,
            monthHours: 0
        });
        await newShiftDoc.save();

        const newShift = {table_num: tab_n, time: newShiftDoc.startShift};
        return newShift;
    };

    // async startShift(tab_n: string): Promise<Shift> {
    //     const crewShift = await ShiftModel.findOne({_tab_num:tab_n}).exec();
    //     if(crewShift && crewShift.startShift && crewShift.finishShift === null) throw new HttpError(404,
    //         `Employee with tab num: ${tab_n} already started the shift at ${formatTimeStamp(crewShift.startShift)}`);
    //
    //     const newShiftDoc = new ShiftModel({
    //         _tab_num:tab_n,
    //         shift_id: generateShiftId(new Date()),
    //         startShift: Date.now(),
    //         finishShift: null,
    //         shiftDuration: 0,
    //         breaks: 0,
    //         correct: null,
    //         monthHours: 0
    //     });
    //     await newShiftDoc.save();
    //
    //     const newShift = {table_num: tab_n, time: newShiftDoc.startShift};
    //     return newShift;
    // };

    async finishShift(tab_n: string): Promise<Shift> {
        const crewShift = await ShiftModel.findOne({_tab_num: tab_n}).lean().exec();
        if(!crewShift) throw new HttpError(404, `Employee with tab num: ${tab_n} not found`);
        if(crewShift.finishShift !== null) throw new HttpError(409,
            `Employee with tab num: ${tab_n} already finished the shift at ${formatTimeStamp(crewShift.finishShift)}`);

        const finish = Date.now();
        const durationInMinutes = Math.floor((finish - crewShift.startShift) / 1000 / 60);

        const updatedShiftDoc = await ShiftModel.findOneAndUpdate(
            {_tab_num: tab_n},
            {$set: {finishShift: finish, shiftDuration: durationInMinutes}},
            {new:true}
        ).exec();
        if(!updatedShiftDoc) throw new HttpError(404, "Finish shift updating failed!");

        const updatedShift = {
            table_num: tab_n,
            time: updatedShiftDoc.finishShift,
            shiftDuration: updatedShiftDoc.shiftDuration
        };
        return updatedShift;
    };

    async setBreak(tab_n: string, shift_break: number): Promise<void> {
        const shiftDoc = await ShiftModel.findOne({_tab_num: tab_n, finishShift: null}).exec();
        if (!shiftDoc) throw new HttpError(404, `Active shift for: ${tab_n} not found`);

        if(shiftDoc.shiftDuration === ShiftDur.SHIFT_240) throw new HttpError(409, "No breaks provided for this shift");

        if(shiftDoc.shiftDuration === ShiftDur.SHIFT_360 && !shiftDoc.breaks) {
            const updated = await ShiftModel.findOneAndUpdate(
                {_tab_num: tab_n, finishShift: null},
                {$set: {breaks: Breaks.BREAK_15}},
                {new:true}
            ).exec();
            console.log(updated)
        };
        if(shiftDoc.shiftDuration === ShiftDur.SHIFT_480 && shiftDoc.breaks < 30){
            const updated = await ShiftModel.findOneAndUpdate(
                {_tab_num: tab_n, finishShift: null},
                {$inc: {breaks: shift_break}},
                {new:true}
            ).exec();
            console.log(updated)
        }else{
            throw new HttpError(409, "No more breaks for this shift")
        };
    };

    // async setBreak(tab_n: string, shift_break: number): Promise<void> {
    //     const shiftDoc = await ShiftModel.findOne({_tab_num: tab_n}).exec();
    //     if (!shiftDoc) throw new HttpError(404, `Employee with tab num: ${tab_n} not found`);
    //
    //     await ShiftModel.findOneAndUpdate(
    //         {_tab_num: tab_n},
    //         {$inc: {breaks: shift_break}},
    //         {new:true}
    //     ).exec();
    // };

    async correctShift(tab_n_crew: string, tab_n_mng: string, shift_id: number): Promise<void> {
        const shiftDoc = await ShiftModel.findOne({_tab_num: tab_n_crew}).exec();
        if (!shiftDoc) throw new HttpError(404, `Employee with tab num: ${tab_n_crew} not found`);

        const duration = getDuration(shiftDoc.startShift);
        if(shiftDoc.shift_id === shift_id && shiftDoc.finishShift === null && duration > ShiftDur.SHIFT_360){
            const correctedFinishShift = shiftDoc.startShift + ShiftDur.SHIFT_360*60*1000;

            await ShiftModel.findOneAndUpdate(
                {_tab_num: tab_n_crew},
                {$set: {finishShift: correctedFinishShift,
                        сorrect: tab_n_mng,
                        shiftDuration: Math.floor((correctedFinishShift - shiftDoc.startShift) / 1000 / 60)}},
                {new: true}
            ).exec();
        }
    };
    // correctShift(tab_n_crew: string, tab_n_mng: string, start: number, finish: number, date: number): void {
    // }

    async getCurrentShiftStaff(): Promise<CurrentCrewShift[]> {
        const staffDocs = await ShiftModel.find().lean().exec();
        // const currStaffDoc = staffDocs.filter(crew => crew.finishShift === null);

        const currStaff: CurrentCrewShift[] = staffDocs.map(emp =>({
            shift_id: emp.shift_id,
            startShift: emp.startShift,
            finishShift:  emp.finishShift,
            table_num: emp._tab_num
        }));
        return currStaff;
    };

    async getEmployeeActiveShift(tab_n: string): Promise<CurrentCrewShift> {
        const shiftDoc = await ShiftModel.findOne(
            {_tab_num: tab_n, finishShift: null}).lean().exec();
        if(!shiftDoc) throw new HttpError(404, `Employee with tab num: ${tab_n} not found`);

        const activeShift = {
            shift_id: shiftDoc.shift_id,
            startShift: shiftDoc.startShift,
            finishShift: shiftDoc.finishShift,
            table_num: tab_n,
            breaks:shiftDoc.breaks
        }
        return activeShift;
    };

    // async getAllEmployeeShifts(tab_n: string): Promise<CrewShift[]> {
    //     const shifts = await ShiftModel.find({table_num: tab_n}).exec();
    // }

};

export const shiftService = new ShiftControlImplMongo();