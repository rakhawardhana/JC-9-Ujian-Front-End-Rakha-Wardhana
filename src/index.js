import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import  'bootstrap/dist/css/bootstrap.min.css'

import reducers from './reducers'

import App from './components/App'


const STORE = createStore(reducers, applyMiddleware(thunk)) // yang masuk ke kurung itu reducernya

ReactDOM.render(
    <Provider store={STORE}>
        <App/>
    </Provider>, 
    document.getElementById('root')
)



