export type CrewShift = {
    _id: number,
    table_num: string,
    startShift: number,
    finishShift: number|null,
    shiftDuration: number,
    breaks: number,
    monthHours: number,
    сorrect: string|null,
};

export type TabNumTime ={
    tabNum:string,
    time:string
};


// export type CrewShift = {
//     shift_id: number,
//     startShift: number,
//     finishShift: number|null,
//     table_num: string,
//     shiftDuration: number,
//     breaks: number,
//     сorrect: string|null,
//     monthHours: number // накопление рабочего времени с начала месяца
// };
// export type Shift = {
//     table_num: string,
//     time: number,
//     shiftDuration?: number
// };
//
// export type CurrentCrewShift = {
//     shift_id: number,
//     startShift: number,
//     finishShift: number|null,
//     table_num: string,
//     breaks?:number
// };