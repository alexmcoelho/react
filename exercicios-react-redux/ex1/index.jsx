import React from 'react'
import ReactDOM from 'react-dom'
import Field from './field'
import {combineReducers, createStore} from 'redux'
import { Provider } from 'react-redux'
import fieldReducer from './fieldReducer'

const reducers = combineReducers({
    field: fieldReducer
})

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <Field initialValue='Teste'></Field>
    </Provider>
, document.getElementById('app'))