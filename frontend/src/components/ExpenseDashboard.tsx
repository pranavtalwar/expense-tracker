import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
import ExpensesSummary from './ExpenseSummary'
import { startSetExpenses } from '../actions/Expenses'

const ExpenseDashboard: React.FC = () => (
    <div>
        <ExpensesSummary />
        <ExpenseListFilters />
        <ExpenseList />
    </div>
)



export default ExpenseDashboard