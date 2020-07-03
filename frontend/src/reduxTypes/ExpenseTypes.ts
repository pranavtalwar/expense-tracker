export interface Expense {
    id: string
    title: string
    description: string
    amount: number
    createdAt: number,
}

export interface ExpenseUpdates {
    title?: string
    description?: string
    amount?: number
    createdAt?: number
}

export interface ExpenseAction {
    type: string
    id?: string
    expense?: Expense
    updates?: ExpenseUpdates
}

export interface AddExpenseAction {
    type: string
    expense: Expense
}

export interface UpdateExpenseAction {
    type: string
    id: string
    updates: ExpenseUpdates
}

export interface RemoveExpenseAction {
    type: string
    id: String
}