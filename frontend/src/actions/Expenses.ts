import { v4 as uuid } from 'uuid';
import { AddExpenseAction, RemoveExpenseAction, UpdateExpenseAction, ExpenseUpdates } from '../reduxTypes/ExpenseTypes';

export const addExpense = ({
    title = '',
    description = '',
    amount = 0,
    createdAt = 0
} = {}): AddExpenseAction => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        title,
        description,
        amount,
        createdAt
    }  
})

// REMOVE_EXPENSE
export const removeExpense = ({ id }: { id: string }): RemoveExpenseAction => ({
    type: 'REMOVE_EXPENSE',
    id
})

// EDIT_EXPENSE
export const editExpense = (id: string, updates: ExpenseUpdates): UpdateExpenseAction => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})