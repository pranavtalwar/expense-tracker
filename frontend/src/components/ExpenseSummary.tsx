import React from 'react'
import { connect } from 'react-redux'
import numeral  from 'numeral'
import selectExpenses from '../selectors/Expenses'
import selectExpensesTotal from '../selectors/ExpenseTotal'
import { ReduxState } from '../reduxTypes/reduxStateType'
import { Expense } from '../reduxTypes/ExpenseTypes'

interface StateProps {
    expenseCount: number,
    expenseTotal: number
}

interface Props extends StateProps {}

const ExpensesSummary: React.FC<Props> = ({ expenseCount, expenseTotal }) => {
    const expenseWord: string = expenseCount === 1 ? 'expense' : 'expenses'
    const formattedExpensesTotal = numeral(expenseTotal/ 100).format('$0,0.00')

    return (
        <div>
            <h1>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
        </div>
    )
}

const mapStateToProps = (state: ReduxState): StateProps => {
    const visibleExpenses: Expense[] = selectExpenses(state.expenses, state.filters)

    return {
        expenseCount: visibleExpenses.length,
        expenseTotal: selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)