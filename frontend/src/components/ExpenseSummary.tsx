import React from 'react'
import { connect } from 'react-redux'
import numeral  from 'numeral'
import { Link } from 'react-router-dom'
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
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header-title">Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
                <div className="page-header-actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
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