import { PrimaryButton } from 'office-ui-fabric-react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ably from '../ably'
import { loadChannel, logout } from '../actions/app'
import { updateFromClient } from '../actions/home'
import NoteList from './components/note/NoteList'
import NoteMaker from './components/note/NoteMaker'

@connect(
  state => ({
    user: state.app.get('user'),
    sessionId: state.app.get('sessionId'),
    channel: state.app.get('channel')
  }),
  dispatch => ({
    logout: bindActionCreators(logout, dispatch),
    loadChannel: bindActionCreators(loadChannel, dispatch),
    updateFromClient: bindActionCreators(updateFromClient, dispatch)
  })
)
export default class Home extends Component {
  componentDidMount() {
    const { user, loadChannel, sessionId, updateFromClient } = this.props
    const userId = user.get('userId')

    const realtime = ably(userId, user.get('id'))
    const channel = realtime.channels.get(`user:${userId}`)

    channel.subscribe(({ data, name: action }) => {
      if (sessionId !== data.sessionId) {
        updateFromClient(action, data)
      }
    })

    loadChannel(channel)
  }

  componentWillUnmount() {
    this.props.channel.unsubscribe()
  }

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
        <NoteList />
      </div>
    )
  }
}
