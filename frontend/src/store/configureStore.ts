import { createStore, combineReducers, Store, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import ExpenseReducer from '../reducers/Expense'
import FilterReducer from '../reducers/Filter'
import AuthReducer from '../reducers/Auth'

const composeEnhancers =  (window as any) .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
   
const configureStore = (): Store => {
    const store = createStore(combineReducers({
        expenses: ExpenseReducer,
        filters: FilterReducer,
        auth: AuthReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    )
    return store
}

export default configureStore