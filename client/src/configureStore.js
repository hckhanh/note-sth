import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import api from './api'

export default function createConfigureStore(reducers) {
  return createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ api }))
  ))
}
