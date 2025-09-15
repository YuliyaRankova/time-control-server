import {CrewShift, TabNumTime} from "../../model/Shift.js";

export interface ShiftControlService{
    startShift: (tabNum:string) => Promise<TabNumTime>;
    finishShift: (tabNum:string) => Promise<TabNumTime>;
    setBreak: (tabNum:string, breakDur: number) => Promise<void>;
    correctShift: (tabNumCrew:string, tabNumMng:string, start:number, finish:number, date:number) => Promise<void>;
    getCurrentShiftStaff: () => Promise<CrewShift[]>;
};

// correctShift: (tab_n_crew:string, tab_n_mng:string, shift_id:number) => Promise<void>;