import React, { useState, Dispatch } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from '../reduxTypes/reduxStateType'
import { Expense, ExpenseCreation, ExpenseUpdates } from '../reduxTypes/ExpenseTypes'
import ExpenseForm from './ExpenseForm'
import ConfirmationModal from './ConfirmationModal'
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

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const removeExpense = () => {
        startRemoveExpense(id)
        setIsOpen(false)
        history.push('/')
    }

    const cancelRemoveExpense = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header-title">Edit Expense</h1>
                </div>
            </div>
            <div className="content-container">
                <ExpenseForm 
                    expense={expense}
                    onSubmit={(expense: ExpenseCreation) => {
                        startEditExpense(id, expense)
                        history.push('/dashboard')
                    }}
                />
                <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        setIsOpen(true)
                    }}
                    className="button button-secondary"
                >   
                    Remove Expense
                </button>
            </div>
            <ConfirmationModal
                isOpen={isOpen}
                removeExpense={removeExpense}
                cancelRemoveExpense={cancelRemoveExpense}
            />
        </div>
    )
}


const mapStateToProps = (state: ReduxState, props: Props): StateProps => {
    return {
        expense: state.expenses.find((expense: Expense) =>  expense._id === props.match.params.id)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
    startEditExpense: (_id: string, updates: ExpenseUpdates) => dispatch(startEditExpense(_id, updates)),
    startRemoveExpense: (_id: string) => dispatch(startRemoveExpense(_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense)