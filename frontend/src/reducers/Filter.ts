import { Filter, FilterAction } from '../reduxTypes/FilterTypes'

const filterReducerDefaultState: Filter = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
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
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}

export default filterReducer