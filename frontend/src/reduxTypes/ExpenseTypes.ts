import { Moment } from "moment";

export interface Expense {
    _id: string
    title: string
    description: string
    amount: number
    createdAt: Moment,
}

export interface ExpenseCreation extends Omit<Expense, '_id'> {}

export interface ExpenseUpdates {
    title: string
    description: string
    amount: number
    createdAt: Moment
}

export interface ExpenseAction {
    type: string
    _id?: string
    expense?: Expense
    updates?: ExpenseUpdates
    expenses?: Expense[]
}

export interface AddExpenseAction {
    type: string
    expense: Expense
}

export interface UpdateExpenseAction {
    type: string
    _id: string
    updates: ExpenseUpdates
}

export interface RemoveExpenseAction {
    type: string
    _id: String
}

export interface SetExpensesAction {
    type: string
    expenses: Expense[]
}