import {CurrentCrewShift, Shift} from "../model/CrewShift.js";

export interface ShiftControlService{
    startShift: (tab_n:string, shift_duration:number) => Promise<Shift>;
    // startShift: (tab_n:string) => Promise<Shift>;
    finishShift: (tab_n:string) => Promise<Shift>;
    setBreak: (tab_n:string, shift_break: number) => Promise<void>;
    correctShift: (tab_n_crew:string, tab_n_mng:string, shift_id:number) => Promise<void>;
    // correctShift: (tab_n_crew:string, tab_n_mng:string, start:number, finish:number, date:number) => Promise<void>;
    getCurrentShiftStaff: () => Promise<CurrentCrewShift[]>;
};