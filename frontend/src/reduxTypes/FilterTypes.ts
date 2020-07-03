export interface Filter {
    text: string
    sortBy: string,
    startDate: undefined | number
    endDate: undefined | number
}

export interface FilterAction { 
    type: string
    text?: string,
    startDate?: number,
    endDate?: number
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
    startDate: number
}

export interface SetEndDateAction {
    type: string
    endDate: number
}
