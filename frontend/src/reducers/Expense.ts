import { Expense, ExpenseAction } from '../reduxTypes/ExpenseTypes'

const expenseReducerDefaultState: Expense[] = []

const expenseReducer = (state: Expense[] = expenseReducerDefaultState, action: ExpenseAction): Expense[] => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            if(action.expense) {
                return [
                    ...state,
                    action.expense
                ]
            }
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_EXPENSE':
            return state.map((expense: Expense) => {
                if(expense.id === action.id) {
                   return {
                       ...expense,
                       ...action.updates
                   } 
                } else {
                    return expense
                }
            })
        default:
            return state
    }
}

export default expenseReducer