import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './index.scss'
import { addExpense } from './actions/Expenses';
import { setTextFilter } from './actions/Filter';

const store = configureStore()
store.dispatch(addExpense({ title: 'expense 1', amount: 300, createdAt: 2 }))
store.dispatch(addExpense({ title: 'expense 2', amount: 500, createdAt: 2 }))

// setTimeout(() => {
//     store.dispatch(setTextFilter('expense'))
// }, 3000)

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));
