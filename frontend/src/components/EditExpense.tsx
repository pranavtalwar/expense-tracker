import React, { Dispatch } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from '../reduxTypes/reduxStateType'
import { Expense, ExpenseCreation, ExpenseUpdates } from '../reduxTypes/ExpenseTypes'
import ExpenseForm from './ExpenseForm'
import { startEditExpense , startRemoveExpense } from '../actions/Expenses'

interface MatchParams {
    id: string
}

interface StateProps {
    expense: Expense | undefined
}

interface DispatchProps {
    startEditExpense: (_id: string, updates: ExpenseUpdates) => void
    startRemoveExpense: (_id: string) => void
}

interface Props extends RouteComponentProps<MatchParams>, StateProps, DispatchProps {}

const EditExpense: React.FC<Props> = ({ expense, startEditExpense, startRemoveExpense, match, history }: Props) => {
    const { id }: { id: string } = match.params
    return (
        <div>
            <ExpenseForm 
                expense={expense}
                onSubmit={(expense: ExpenseCreation) => {
                    startEditExpense(id, expense)
                    history.push('/dashboard')
                }}
            />
            <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    startRemoveExpense(id)
                    history.push('/dashboard')
                }}
            >   
                Remove
            </button>
        </div>
    )
}


const mapStateToProps = (state: ReduxState, props: Props): StateProps => {
    console.log('running')
    return {
        expense: state.expenses.find((expense: Expense) =>  expense._id === props.match.params.id)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
    startEditExpense: (_id: string, updates: ExpenseUpdates) => dispatch(startEditExpense(_id, updates)),
    startRemoveExpense: (_id: string) => dispatch(startRemoveExpense(_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense)