import React, { Dispatch } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from '../reduxTypes/reduxStateType'
import { Expense, ExpenseCreation } from '../reduxTypes/ExpenseTypes'
import ExpenseForm from './ExpenseForm'
import { editExpense, removeExpense } from '../actions/Expenses'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams>, StateProps {
    dispatch: Dispatch<any>
}

const EditExpense: React.FC<Props> = ({ expense, dispatch, match, history }: Props) => {
    return (
        <div>
            <ExpenseForm 
                expense={expense}
                onSubmit={(expense: ExpenseCreation) => {
                    dispatch(editExpense(match.params.id, expense))
                    history.push('/')
                }}
            />
            <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    dispatch(removeExpense({ id: String(expense?.id) }))
                    history.push('/')
                }}
            >   
                Remove
            </button>
        </div>
    )
}

interface StateProps {
    expense: Expense | undefined
}

const mapStateToProps = (state: ReduxState, props: Props): StateProps => {
    return {
        expense: state.expenses.find((expense: Expense) =>  expense.id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(EditExpense)