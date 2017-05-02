import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from '../../../util'

const RedirectRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isAuthenticated(user) ? (<Redirect push to='/' />) : (<Component {...props} />)
    )} />
  )
}

export default connect(
  (state) => ({
    user: state.app.get('user')
  })
)(RedirectRoute)
