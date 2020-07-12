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
            return state.filter(({ _id }) => _id !== action._id)
        case 'EDIT_EXPENSE':
            return state.map((expense: Expense) => {
                if(expense._id === action._id) {
                   return {
                       ...expense,
                       ...action.updates
                   } 
                } else {
                    return expense
                }
            })
        case 'SET_EXPENSES':
            if(action.expenses) {
                return [...action.expenses]
            }  
        default:
            return state
    }
}

export default expenseReducer