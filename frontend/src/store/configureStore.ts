import { createStore, combineReducers, Store } from 'redux'
import ExpenseReducer from '../reducers/Expense'
import FilterReducer from '../reducers/Filter'

const configureStore = (): Store => {
    const store = createStore(combineReducers({
        expenses: ExpenseReducer,
        filters: FilterReducer
    }))
    return store
}

export default configureStore