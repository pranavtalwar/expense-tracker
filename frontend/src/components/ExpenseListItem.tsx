import React from 'react'
import { Link } from 'react-router-dom'
import moment, { Moment } from 'moment'
import numeral from 'numeral'

interface Props {
    title: string,
    amount: number
    createdAt: Moment
    _id: string
}

const ExpenseListItem:React.FC<Props> = ({ _id, title, amount, createdAt }: Props) => {
    const id: string  = _id
    return (
        <Link 
            to={`/edit/${id}`}
            className="list-item"
        >
            <div>
                <h3 className="list-item-header">{title}</h3>
                <span className="list-item-date">{moment(createdAt).format('MMMM Do, YYYY')}</span>
            </div>
            <h3 className="list-item-amount">{numeral(amount/100).format('$0,0.00')}</h3>
        </Link>
    ) 
}

export default ExpenseListItem