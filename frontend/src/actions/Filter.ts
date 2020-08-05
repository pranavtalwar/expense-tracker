import { 
    SetTextFilterAction, 
    SortByAmountAction, 
    SortByDateAction, 
    SetStartDateAction, 
    SetEndDateAction 
} from "../reduxTypes/FilterTypes"
import { Moment } from "moment"

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

export const setStartDate = (startDate: Moment | null): SetStartDateAction => ({
    type: 'SET_START_DATE',
    startDate
})

export const setEndDate = (endDate: Moment | null): SetEndDateAction => ({
    type: 'SET_END_DATE',
    endDate
})