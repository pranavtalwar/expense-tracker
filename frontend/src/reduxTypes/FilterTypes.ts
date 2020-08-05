import { Moment } from "moment";

export interface Filter {
    text: string
    sortBy: string,
    startDate: Moment | null
    endDate: Moment | null
}

export interface FilterAction { 
    type: string
    text?: string
    startDate?: Moment | null
    endDate?: Moment | null
}

export interface SetTextFilterAction {
    type: string
    text: string
}

export interface SortByAmountAction {
    type: string
}

export interface SortByDateAction {
    type: string
}

export interface SetStartDateAction {
    type: string
    startDate: Moment | null
}

export interface SetEndDateAction {
    type: string
    endDate: Moment | null
}
