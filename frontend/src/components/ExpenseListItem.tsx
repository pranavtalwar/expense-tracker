import React from 'react'
import { Link } from 'react-router-dom'
import { Moment } from 'moment'

interface Props {
    title: string,
    amount: number
    createdAt: Moment
    _id: string
}

const ExpenseListItem:React.FC<Props> = ({ _id, title, amount, createdAt }: Props) => {
    const id: string  = _id
    return (     
            <div>
                <Link to={`/edit/${id}`}>
                    <h3>{title}</h3>
                </Link>
                <p>{amount} - {createdAt}</p>
            </div>
    ) 
}

export default ExpenseListItem