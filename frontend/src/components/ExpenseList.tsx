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
        <div className="content-container">
            <div className="list-header">
                <div className="show-for-mobile">Expenses</div>
                <div className="show-for-desktop">Expense</div>
                <div className="show-for-desktop">Amount</div>
            </div>
            <div className="list-body">
                {
                    expenses.length > 0 ? expenses.map((expense: Expense) => {
                        return <ExpenseListItem 
                                    key={expense._id}
                                    {...expense}
                                />
                    }):
                    <div className="list-item list-item-message">
                        No expenses
                    </div>
                }
             </div>
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

