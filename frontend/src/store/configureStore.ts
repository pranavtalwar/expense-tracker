import { createStore, combineReducers, Store, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import ExpenseReducer from '../reducers/Expense'
import FilterReducer from '../reducers/Filter'
import AuthReducer from '../reducers/Auth'
import { ReduxState } from '../reduxTypes/reduxStateType'

const composeEnhancers =  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const saveToLocalStorage = (state: ReduxState): void => {
    try {
        const serializedState: string = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch(error) {
        console.log(error)
    }
}

const loadFromLocalStorage = (): undefined | ReduxState => {
    try {
        const serializedState: string | null = localStorage.getItem('state')
        if(serializedState == null) {
            return undefined
        } else {
            return JSON.parse(serializedState)
        } 
    } catch(error) {
        console.log(error)
        return undefined
    }
}

const persistedState: undefined | ReduxState = loadFromLocalStorage()

const store = createStore(
    combineReducers({
        expenses: ExpenseReducer,
        filters: FilterReducer,
        auth: AuthReducer
    }),
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
)

store.subscribe(() => saveToLocalStorage(store.getState()))
    
export default store