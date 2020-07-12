import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
import { startSetExpenses } from '../actions/Expenses'

const ExpenseDashboard: React.FC = () => (
    <div>
        <ExpenseListFilters />
        <ExpenseList />
    </div>
)



export default ExpenseDashboard