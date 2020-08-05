import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/configureStore';
import { startUserLoad } from './actions/Auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss'

const Application:React.FC = () => {

    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

ReactDOM.render(<Application />, document.getElementById('root'));



