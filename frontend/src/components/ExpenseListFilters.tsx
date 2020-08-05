import React, { Dispatch, useState } from 'react'
import { Moment } from 'moment'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/Filter'
import { Filter } from '../reduxTypes/FilterTypes'
import { ReduxState } from '../reduxTypes/reduxStateType'

interface StateProps {
    filter: Filter
}

interface Props extends StateProps {   
    dispatch: Dispatch<any> 
}

const ExpenseListFilters: React.FC<Props> = ({dispatch, filter }: Props) => {
    const [calendarFocused, setCalendarFocused] = useState<"startDate" | "endDate" | null>(null)

    const onDatesChange = ({ startDate, endDate }: { startDate: Moment | null , endDate: Moment | null }) => {
        dispatch(setStartDate(startDate))
        dispatch(setEndDate(endDate))
    }

    const onFocusChange = (calendarFocused: "startDate" | "endDate" | null): void => {
        setCalendarFocused(calendarFocused)
    }

    return (
        <div className="content-container">
            <div className="input-group">
                <div className="input-group-item">
                    <input 
                        className="text-input"
                        type="text"
                        placeholder="Search Expenses"
                        value={filter.text}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {  
                            dispatch(setTextFilter(e.target.value))
                        }}
                    />
                </div>
                <div className="input-group-item">
                    <select
                        className="select"
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
                <div className="input-group-item">
                    <DateRangePicker
                        startDateId="startDateID"
                        endDateId="endDateiD"
                        startDate={filter.startDate}
                        endDate={filter.endDate }
                        onDatesChange={onDatesChange}
                        focusedInput={calendarFocused}
                        onFocusChange={onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                        showClearDates={true}
                    />
                </div>
            </div>
        </div>
    ) 
}

const mapStateToProps = (state: ReduxState): StateProps => {
    return {
        filter: state.filters
    }   
}

export default connect(mapStateToProps)(ExpenseListFilters)