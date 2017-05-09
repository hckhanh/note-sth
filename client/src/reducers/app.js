import { fromJS, Map } from 'immutable'
import * as React from 'react'
import shortid from 'shortid'

const INITIAL_STATE = Map({
  loading: true,
  user: Map(JSON.parse(localStorage.getItem('user'))),
  channel: null,
  sessionId: shortid.generate()
})

export default function(state = INITIAL_STATE, { type, user, channel }) {
  switch (type) {
    case 'LOAD_APP':
      return state.merge({ loading: true })
    case 'LOAD_APP_DONE':
      return state.merge({ loading: false })
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(user))
      return state.set('user', fromJS(user))
    case 'LOGOUT':
      localStorage.removeItem('user')
      return state.update('user', Map())
    case 'LOAD_CHANNEL':
      return state.set('channel', channel)
    default:
      return state
  }
}
