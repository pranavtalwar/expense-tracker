import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';
import { startUserLoad } from './actions/Auth';
import 'normalize.css/normalize.css';
import './index.scss'


export const store = configureStore()

const Application:React.FC = () => {
    useEffect(() => {
        const token: string | null = localStorage.getItem('token')
        if(token) {
            store.dispatch(startUserLoad(token))
        }
    })

    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

ReactDOM.render(<Application />, document.getElementById('root'));

// const token: string | null= localStorage.getItem('token')

// if(token) {
   
    
//     store.dispatch(startUserLoad(token))
//     // const state: ReduxState = store.getState()
//     if(history.location.pathname === '/') {
//         history.push('/dashboard')
//     }
// } else {
//     ReactDOM.render(jsx, document.getElementById('root'));
//     history.push('/')
// }



