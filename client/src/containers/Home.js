import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions/app'
import NoteMaker from './components/note/NoteMaker'

@connect(
  null,
  dispatch => ({
    logout: bindActionCreators(logout, dispatch)
  })
)
export default class Home extends Component {
  handleLogoutAccount = () => {
    this.props.logout()
  }

  render() {
    return (
      <div>
        <NoteMaker />
        <PrimaryButton
          text='Sign Out'
          onClick={this.handleLogoutAccount}
        />
      </div>
    )
  }
}
