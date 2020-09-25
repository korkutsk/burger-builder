import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import builderBurgerReducer from './store/reducer/burgerBuilder';
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/auth';

const composeEnchancer = process.env.NODE_ENV === 'development' 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : null || compose;

const rootReducer = combineReducers({
    burgerBuilder: builderBurgerReducer,
    order: orderReducer,
    auth: authReducer
});

const store = createStore(rootReducer, composeEnchancer(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
