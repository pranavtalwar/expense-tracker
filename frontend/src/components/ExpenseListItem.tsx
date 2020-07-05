import React, { Dispatch } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    title: string,
    amount: number
    createdAt: number
    id: string
}

const ExpenseListItem:React.FC<Props> = ({ id, title, amount, createdAt }: Props) => (     
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{title}</h3>
        </Link>
        <p>{amount} - {createdAt}</p>
    </div>
)

export default ExpenseListItem