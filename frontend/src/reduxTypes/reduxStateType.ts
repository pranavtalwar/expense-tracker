import { Expense } from "./ExpenseTypes";
import { Filter } from "./FilterTypes";

export interface ReduxState {
    expenses: Expense[]
    filters: Filter
} 