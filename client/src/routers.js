import createHistory from 'history/createBrowserHistory'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './containers/App'
import PrivateRoute from './containers/components/route/PrivateRoute'
import RedirectRoute from './containers/components/route/RedirectRoute'
import Home from './containers/Home'
import Login from './containers/Login'
const history = createHistory()

export default ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <RedirectRoute path="/login" component={Login} />
        </Switch>
      </App>
    </Router>
  </Provider>
)
