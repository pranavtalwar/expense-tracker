import { Expense } from "./ExpenseTypes";
import { Filter } from "./FilterTypes";
import { Auth } from "./AuthTypes";

export interface ReduxState {
    expenses: Expense[]
    filters: Filter
    auth: Auth
} 