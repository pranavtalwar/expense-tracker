import { 
    SetTextFilterAction, 
    SortByAmountAction, 
    SortByDateAction, 
    SetStartDateAction, 
    SetEndDateAction 
} from "../reduxTypes/FilterTypes"

export const setTextFilter = (text: string): SetTextFilterAction => ({
    type: 'SET_TEXT_FILTER',
    text
})

export const sortByAmount = (): SortByAmountAction => ({
    type: 'SORT_BY_AMOUNT'
})

export const sortByDate = (): SortByDateAction => ({
    type: 'SORT_BY_DATE'
})

export const setStartDate = (startDate: number): SetStartDateAction => ({
    type: 'SET_START_DATE',
    startDate
})

export const setEndDate = (endDate: number): SetEndDateAction => ({
    type: 'SET_END_DATE',
    endDate
})