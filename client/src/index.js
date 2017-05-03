import React from 'react'
import ReactDOM from 'react-dom'
import createConfigureStore from './configureStore'
import reducers from './reducers'
import Routers from './routers'
import './styles/index.scss'

// Create store for app state
const store = createConfigureStore(reducers)

ReactDOM.render(<Routers store={store} />, document.getElementById('index'))
