import {Request, Response} from "express";
import {shiftService} from "../services/shiftControlImplMongo.js";
import {formatTimeStamp} from "../utils/tools.js";

export const startShift = async (req: Request, res: Response) => {
   const {tab_num} = req.query;
   const result = await shiftService.startShift(tab_num as string);

   const shift = {...result, time: formatTimeStamp(result.time)};
   res.json(shift);
};

export const finishShift = async (req: Request, res: Response) => {
    const {tab_num} = req.query;
    const result = await shiftService.finishShift(tab_num as string);

    const shift = {...result, time: formatTimeStamp(result.time), shiftDuration: result.shiftDuration};
    res.json(shift);
};

export const setBreak = async (req: Request, res: Response) => {
   const {tab_num, shift_break} = req.query;
   await shiftService.setBreak(tab_num as string, Number(shift_break));
   res.status(200).send("Break updated successfully");
};

export const correctShift = async (req: Request, res: Response) => {
   const {tab_n_crew, tab_n_mng, shift_id} = req.body;
   await shiftService.correctShift(tab_n_crew, tab_n_mng, shift_id);
   res.status(200).send("Correction fulfilled successfully");
};

export const getCurrentShiftStaff = async (req: Request, res: Response) => {
    const currentStaff = await shiftService.getCurrentShiftStaff();

    const currShift = currentStaff.map(crew => ({
        ...crew,
        startShift: formatTimeStamp(crew.startShift),
        finishShift: crew.finishShift? formatTimeStamp(crew.finishShift) : null,
    }));
    res.json(currShift);
};

export const getEmployeeActiveShift = async (req: Request, res: Response) => {
    const {tab_num} = req.query;
    const result = await shiftService.getEmployeeActiveShift(tab_num as string);
    const shift = {...result, startShift: formatTimeStamp(result.startShift)};
    res.json(shift);
};