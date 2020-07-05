import React, { Dispatch } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { Expense, ExpenseCreation } from '../reduxTypes/ExpenseTypes'
import { addExpense } from '../actions/Expenses'

interface Props extends RouteComponentProps {
    dispatch: Dispatch<any>
}

const AddExpense: React.FC<Props> = ({ dispatch, history }: Props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
            onSubmit={(expense: ExpenseCreation) => {
                dispatch(addExpense(expense))
                history.push('/')
            }}
        />
    </div>
)

export default connect()(AddExpense)