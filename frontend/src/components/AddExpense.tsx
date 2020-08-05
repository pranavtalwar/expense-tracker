import React, { Dispatch } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { ExpenseCreation } from '../reduxTypes/ExpenseTypes'
import { startAddExpense } from '../actions/Expenses'

interface DispatchProps {
    startAddExpense: (expense: ExpenseCreation) => void
}

interface Props extends RouteComponentProps, DispatchProps {}

const AddExpense: React.FC<Props> = ({ startAddExpense, history }: Props) => {
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header-title">Add Expense</h1>
                </div>
            </div>
            <div className="content-container">
                <ExpenseForm 
                    onSubmit={(expense: ExpenseCreation) => {
                        startAddExpense(expense)
                        history.push('/dashboard')
                    }}
                />
            </div>     
        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    startAddExpense: (expense: ExpenseCreation) => dispatch(startAddExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpense)