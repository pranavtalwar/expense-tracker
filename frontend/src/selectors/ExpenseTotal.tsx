import { Expense } from "../reduxTypes/ExpenseTypes"

const expenseTotal = (expenses: Expense[]): number => {
    return expenses
    .map((expense: Expense) => expense.amount)
    .reduce((sum: number, value: number): number => sum + value, 0)
}

export default expenseTotal