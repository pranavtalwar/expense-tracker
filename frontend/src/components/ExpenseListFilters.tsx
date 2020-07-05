import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { setTextFilter, sortByAmount, sortByDate } from '../actions/Filter'
import { Filter } from '../reduxTypes/FilterTypes'
import { ReduxState } from '../reduxTypes/reduxStateType'

interface StateProps {
    filter: Filter
}

interface Props extends StateProps {   
    dispatch: Dispatch<any> 
}

const ExpenseListFilters: React.FC<Props> = ({dispatch, filter }: Props) => (
    <div>
        <input 
            type="text" 
            value={filter.text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {  
                dispatch(setTextFilter(e.target.value))
            }}
        />
        <select
            value={filter.sortBy}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => {
                if(e.target.value === 'amount') {
                    dispatch(sortByAmount())
                } else if (e.target.value === 'date') {
                    dispatch(sortByDate())
                }
            }}
        >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
) 

const mapStateToProps = (state: ReduxState): StateProps => {
    return {
        filter: state.filters
    }   
}

export default connect(mapStateToProps)(ExpenseListFilters)