import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { removeExpense } from '../actions/Expenses'

interface Props {
    title: string,
    amount: number
    createdAt: number
    id: string
    dispatch: Dispatch<any>
}

const ExpenseListItem:React.FC<Props> = ({ dispatch, id, title, amount, createdAt }: Props) => (     
    <div>
        <h3>{title}</h3>
        <p>{amount} - {createdAt}</p>
        <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => dispatch(removeExpense({ id })) }
        >   
            Remove
        </button>
    </div>
)

export default connect()(ExpenseListItem)