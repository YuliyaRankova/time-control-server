export type CrewShift = {
    shift_id: number,
    startShift: number,
    finishShift: number|null,
    table_num: string,
    shiftDuration: number,
    breaks: number,
    сorrect: string|null,
    monthHours: number // накопление рабочего времени с начала месяца
};

export type Shift = {
    table_num: string,
    time: number,
    shiftDuration?: number
};

export type CurrentCrewShift = {
    shift_id: number,
    startShift: number,
    finishShift: number|null,
    table_num: string,
    breaks?:number
};