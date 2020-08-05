import { Expense } from "../reduxTypes/ExpenseTypes";
import { Filter } from "../reduxTypes/FilterTypes";

const getVisibleExpenses = (expenses: Expense[], filter: Filter): Expense[] => {
    const filteredExpenses: Expense[] = expenses.filter((expense: Expense) => {
        let startDateMatch: boolean = filter.startDate ?  filter.startDate.isSameOrBefore(expense.createdAt, 'day') : true
        let endDateMatch: boolean = filter.endDate ? filter.endDate.isSameOrAfter(expense.createdAt, 'day') : true  
        let textMatch: boolean = expense.title.toLowerCase().includes(filter.text.toLowerCase())
        return startDateMatch && endDateMatch && textMatch
    })

    const compareFunction = (a: Expense, b: Expense): number => {
        if(filter.sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if(filter.sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
        return 0
    }

    const sortedanFilteredExpenses: Expense[] = filteredExpenses.sort(compareFunction)

    return sortedanFilteredExpenses
}

export default getVisibleExpenses