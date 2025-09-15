import {Request, Response} from "express";
import {shiftService} from "../services/timeControlService/shiftControlImplMongo.js";
import {accountService} from "../services/accountingService/accountServiceImplMongo.js";
import {consoleLogger, logger} from "../Logger/winston.js";

export const startShift = async (req: Request, res: Response) => {
    consoleLogger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    const tabNum = req.query.tabNum as string;
    const emp = await accountService.getEmployeeByTabNum(tabNum);
    const result = await shiftService.startShift(tabNum);
    res.json(result);
};

export const finishShift = async (req: Request, res: Response) => {
    consoleLogger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    const tabNum = req.query.tabNum as string;
    const result = await shiftService.finishShift(tabNum);
    res.status(201).json(result);
};

export const setBreak = async (req: Request, res: Response) => {
    consoleLogger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
   const {tabNum, breakDur} = req.query;
   await shiftService.setBreak(tabNum as string, Number(breakDur));
   res.send("Ok");
};

export const correctShift = async (req: Request, res: Response) => {
    consoleLogger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
   const {tabNumCrew, tabNumMng, start, finish, date} = req.body;
   await shiftService.correctShift(tabNumCrew, tabNumMng, start, finish, date);
   res.status(200).send("Correction fulfilled successfully");
};

export const getCurrentShiftStaff = async (req: Request, res: Response) => {
    consoleLogger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    const currentStaff = await shiftService.getCurrentShiftStaff();
    const formatted = currentStaff.map(emp => ({
        ...emp,
        startShift: new Date(emp.startShift).toTimeString(),
    }));
    res.json(formatted);
};

export const getEmployeeShift = async (req: Request, res: Response) => {
    consoleLogger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    const tabNum = req.query.tabNum as string;
    const empShift = await shiftService.getEmployeeShift(tabNum);
    const formatted = ({
        ...empShift,
        startShift: new Date(empShift.startShift).toTimeString(),
        finishShift: empShift.finishShift ? new Date(empShift.finishShift).toTimeString() : null,
        shiftDuration: empShift.shiftDuration ? Math.floor(empShift.shiftDuration / (1000 * 60)) : null
    });
    res.json(formatted);
};