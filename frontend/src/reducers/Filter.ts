import moment from 'moment'
import { Filter, FilterAction } from '../reduxTypes/FilterTypes'

const filterReducerDefaultState: Filter = {
    text: '',
    sortBy: 'date',
    startDate: null,
    endDate: null
}

const filterReducer = (state: Filter = filterReducerDefaultState, action: FilterAction): Filter => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            if(action.text === '') {
                return {
                    ...state,
                    text: ''
                }
            }
            if(action.text) {
                return {
                    ...state,
                    text: action.text
                }
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            if(action.startDate) {
                return {
                    ...state,
                    startDate: action.startDate
                }
            } else {
                return {
                    ...state,
                    startDate: null
                }
            }
        case 'SET_END_DATE':
            if(action.endDate) {
                return {
                    ...state,
                    endDate: action.endDate
                }
            } else {
                return {
                    ...state,
                    endDate: null
                }
            }
        case 'LOGOUT':
            return filterReducerDefaultState
        default:
            return state
    }
}

export default filterReducer