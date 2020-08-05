import { AddExpenseAction, RemoveExpenseAction, UpdateExpenseAction, ExpenseUpdates, Expense, SetExpensesAction, ExpenseCreation } from '../reduxTypes/ExpenseTypes';
import { Moment } from 'moment';
import { Dispatch } from 'react';
import { url } from '../constants'
import  getAuthHeader from '../utils/AuthHeader'
import axios from 'axios';

interface ExpenseResponse extends Response {
    data: Expense
}

const addExpense = ({
    title,
    description = '',
    amount, 
    createdAt,
    _id
}: { title: string, description?: string, amount: number, createdAt: Moment, _id: string }): AddExpenseAction => ({
    type: 'ADD_EXPENSE',
    expense: {
        title,
        description,
        amount,
        createdAt,
        _id
    }  
})

export const startAddExpense = (expense: ExpenseCreation) => 
    async (dispatch: Dispatch<any>): Promise<void> => {
        try {

            const response: ExpenseResponse = await axios.post(`${url}/expenses`, expense, getAuthHeader()) 
            const { data }: { data: Expense } = response
            dispatch(addExpense(data))
        } catch(error) { }
    }


// REMOVE_EXPENSE
const removeExpense = ({ _id }: { _id: string }): RemoveExpenseAction => ({
    type: 'REMOVE_EXPENSE',
    _id
})


export const startRemoveExpense = (_id: string) => 
    async (dispatch: Dispatch<any>): Promise<void> => {
        try {
            const response: ExpenseResponse = await axios.delete(`${url}/expenses/${_id}`, getAuthHeader())
            if(response.status == 200) {
                dispatch(removeExpense({ _id }))
            }
        } catch(error) {

        }
    }


// EDIT_EXPENSE
const editExpense = (_id: string, updates: ExpenseUpdates): UpdateExpenseAction => ({
    type: 'EDIT_EXPENSE',
    _id,
    updates
})

export const startEditExpense = (_id: string, updates: ExpenseUpdates) =>
    async (dispatch: Dispatch<any>) => {
        try {
            const response: ExpenseResponse = await axios.patch(`${url}/expenses/${_id}`, updates, getAuthHeader())
            const { data }: { data: Expense } = response 
            dispatch(editExpense(_id, data))

        } catch(error) {}
    }

interface SetExpenseResponse extends Response {
    data: Expense[]
}

const setExpenses = (expenses: Expense[]): SetExpensesAction => ({
    type: 'SET_EXPENSES',
    expenses
})

export const startSetExpenses = () =>
    async (dispatch: Dispatch<any>): Promise<void> => {
        try {
            const response: SetExpenseResponse = await axios.get(`${url}/expenses`, getAuthHeader())
            const expenses: Expense[] = response.data
            dispatch(setExpenses(expenses))
        } catch(error) {
            // dispatch()
        }

    }
