import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import api from './api'

const composeEnhancers = composeWithDevTools({})

export default function createConfigureStore(reducers) {
  return createStore(reducers, composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ api }))
  ))
}
