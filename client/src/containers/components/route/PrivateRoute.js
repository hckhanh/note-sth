import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from '../../../util'

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isAuthenticated(user) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
    )} />
  )
}

export default connect(
  (state) => ({
    user: state.app.get('user')
  })
)(PrivateRoute)
