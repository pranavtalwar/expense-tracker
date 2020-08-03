import React, { useEffect, Dispatch } from 'react'
import { connect } from 'react-redux'
import { Expense } from '../reduxTypes/ExpenseTypes'
import { ReduxState } from '../reduxTypes/reduxStateType'
import { startSetExpenses } from '../actions/Expenses'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/Expenses'

interface StateProps {
    expenses: Expense[]
}

interface DispatchProps {
    startSetExpenses: () => void
}

interface Props extends StateProps, DispatchProps {
    startSetExpenses: () => void
}

const ExpenseList: React.FC<Props> = ({ expenses, startSetExpenses }) => {

    useEffect(() => {
        startSetExpenses()
    }, [expenses.length, startSetExpenses])

    return (
        <div>
            <h1>Expense List</h1>
            {expenses.length > 0 ? expenses.map((expense: Expense) => {
                return <ExpenseListItem 
                            key={expense._id}
                            {...expense}
                        />
            }):
            <p>Loading...</p>
            }
        </div>
    )
}

const mapStateToProps = (state: ReduxState): StateProps => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
    startSetExpenses: () => dispatch(startSetExpenses())
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList)

