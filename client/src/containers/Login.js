import { Callout, DirectionalHint, Link, PrimaryButton, TextField } from 'office-ui-fabric-react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../actions/app'

@connect(
  null,
  dispatch => ({
    login: bindActionCreators(login, dispatch)
  })
)
export default class Login extends Component {
  state = {
    showCallout: false,
    errorLoginField: null,
    errorPassword: null
  }

  handleShowDemoAccount = () => {
    this.setState({ showCallout: true })
  }

  handleCalloutDismiss = () => {
    this.setState({ showCallout: false })
  }

  handleLoginAccount = () => {
    const loginField = this.loginField.value
    const password = this.password.value

    if (!loginField || !password) {
      this.setState({
        errorLoginField: !loginField ? 'Username or Email cannot be empty' : null,
        errorPassword: !password ? 'Password cannot be empty' : null
      })
    } else {
      const account = { password }

      if (loginField.match(/\S+@\S+\.\S+/)) {
        account.email = loginField
      } else {
        account.username = loginField
      }

      this.props.login(account)
    }
  }

  handleLoginFieldChange = () => {
    this.setState({ errorLoginField: null })
  }

  handlePasswordChange = () => {
    this.setState({ errorPassword: null })
  }

  render() {
    return (
      <div className='login'>
        <TextField
          ref={node => this.loginField = node}
          placeholder='Username or Email'
          validateOnLoad={false}
          errorMessage={this.state.errorLoginField}
          onChanged={this.handleLoginFieldChange}
        />
        <TextField
          ref={node => this.password = node}
          type='password'
          placeholder='Password'
          validateOnLoad={false}
          errorMessage={this.state.errorPassword}
          onChanged={this.handlePasswordChange}
        />
        <PrimaryButton
          className='login-button'
          text='Sign In'
          onClick={this.handleLoginAccount}
        />
        <Link
          id='demoAccountLink'
          className='more-button'
          onClick={this.handleShowDemoAccount}
        >
          Need a demo account?
        </Link>
        {
          this.state.showCallout && (
            <Callout
              className='demo-account-callout'
              target='#demoAccountLink'
              setInitialFocus={true}
              directionalHint={DirectionalHint.bottomCenter}
              onDismiss={this.handleCalloutDismiss}
            >
              <div>
                <div className='callout-title'>Give it a try!</div>
                <div className='callout-content'>
                  <div className='callout-description'>
                    You can login by using demo account to see all features, but you <b>cannot change data</b>.
                  </div>
                  <div className='callout-extra-content'>
                    Username/Password: demo/demo
                  </div>
                </div>
              </div>
            </Callout>
          )
        }
      </div>
    )
  }
}
