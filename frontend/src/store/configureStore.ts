import { createStore, combineReducers, Store } from 'redux'
import ExpenseReducer from '../reducers/Expense'
import FilterReducer from '../reducers/Filter'

   
const configureStore = (): Store => {
    const store = createStore(combineReducers({
        expenses: ExpenseReducer,
        filters: FilterReducer
    }),
   (window as any) .__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store
}

export default configureStore