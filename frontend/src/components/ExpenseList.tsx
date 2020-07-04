import React from 'react'
import { connect } from 'react-redux'
import { Expense } from '../reduxTypes/ExpenseTypes'
import { ReduxState } from '../reduxTypes/reduxStateType'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/Expenses'

interface Props {
    expenses: Expense[]
}

const ExpenseList: React.FC<Props> = (props: Props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.map((expense: Expense) => {
            return <ExpenseListItem 
                        key={expense.id}
                        {...expense}
                    />
        })}
    </div>
)

const mapStateToProps = (state: ReduxState) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpenseList)

