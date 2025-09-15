import express from "express";
import {queryValidation} from "../validation/queryValidation.js";
import {BreakSchema, CorrectionSchema, TabNumSchema} from "../validation/joiSchemas.js";
import * as controller from "../controllers/ShiftController.js";
import {bodyValidation} from "../validation/bodyValidation.js";

export const shiftRouter = express.Router();

shiftRouter.post('/start', queryValidation(TabNumSchema), controller.startShift);
shiftRouter.post('/finish', queryValidation(TabNumSchema), controller.finishShift);
shiftRouter.put('/break', queryValidation(BreakSchema), controller.setBreak);
shiftRouter.put('/correct', bodyValidation(CorrectionSchema), controller.correctShift);
shiftRouter.get('/staff', controller.getCurrentShiftStaff);
shiftRouter.get('/employee_shift', queryValidation(TabNumSchema), controller.getEmployeeShift);