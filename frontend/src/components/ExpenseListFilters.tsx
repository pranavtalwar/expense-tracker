import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { setTextFilter } from '../actions/Filter'
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
    </div>
) 

const mapStateToProps = (state: ReduxState): StateProps => {
    return {
        filter: state.filters
    }   
}

export default connect(mapStateToProps)(ExpenseListFilters)