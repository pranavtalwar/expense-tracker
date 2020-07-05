import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import { ExpenseCreation } from '../reduxTypes/ExpenseTypes'

interface Props {
    onSubmit: (expense: any) => void
    expense?: ExpenseCreation 
}

interface ExpenseForm {
    title: string,
    amount: string
    description: string,
    createdAt: Moment | null
}

const ExpenseForm: React.FC<Props> = (props) => {
    const [data, setData] = useState<ExpenseForm>({
        title: props.expense ? props.expense.title : '',
        amount: props.expense ? ((props.expense?.amount)/100).toString() : '',
        description: props.expense ? props.expense.description : '',
        createdAt: props.expense ? moment(props.expense.createdAt) : moment()
    })
    
    const [calendarFocused, setCalendarFocused] = useState<boolean | null >(false)
    const [error, setError] = useState<string>('')

    const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const amount: string = e.target.value
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setData({ ...data, amount: amount })
        }
    }

    const onDateChange = (createdAt: Moment | null): void => {
        if(createdAt) {
            setData({ ...data, createdAt })
        }
    }

    const onChange =  (e: React.ChangeEvent<any>): void => {
        setData({ ...data, [e.target.name]: e.target.value})
    }

    const onFocusChange = ({ focused }: { focused: boolean | null }): void => {
        setCalendarFocused(focused)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if(!data.title || !data.amount) {
            setError('Please provide description and amount.')
        } else {
            props.onSubmit({
                title: data.title,
                description: data.description,
                amount: parseInt(data.amount, 10) * 100,
                createdAt: data.createdAt?.valueOf()
            })
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                {error && <p>{error}</p>}
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={data.title}
                    autoFocus
                    onChange={onChange}
                />
                <input
                    type="text"
                    placeholder="Amount"
                    name="amount"
                    value={data.amount}
                    onChange={onAmountChange}
                />
                <SingleDatePicker 
                    id="date-picker"
                    date={data.createdAt}
                    onDateChange={onDateChange}
                    focused={calendarFocused}
                    onFocusChange={onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    placeholder="Please add a description for your expense (optional)"
                    name="description"
                    value={data.description}
                    onChange={onChange}
                />   
                <button>Add Expense</button>
            </form>
        </div>
    )
}

export default ExpenseForm