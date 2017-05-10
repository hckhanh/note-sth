import { fromJS, Map } from 'immutable'
import * as React from 'react'
import shortid from 'shortid'

const INITIAL_STATE = Map({
  loading: true,
  user: Map(JSON.parse(localStorage.getItem('user'))),
  userData: Map(),
  channel: null,
  sessionId: shortid.generate()
})

export default function(state = INITIAL_STATE, { type, ...data }) {
  switch (type) {
    case 'LOAD_APP':
      return state.merge({ loading: true })
    case 'LOAD_APP_DONE':
      return state.merge({ loading: false })
    case 'LOGIN':
      const { user } = data

      localStorage.setItem('user', JSON.stringify(user))
      return state.set('user', fromJS(user))
    case 'GET_USER_DATA':
      return state.set('userData', fromJS(data.userData))
    case 'LOGOUT':
      localStorage.removeItem('user')
      return state.merge({ user: Map(), userData: Map() })
    case 'LOAD_CHANNEL':
      return state.set('channel', data.channel)
    default:
      return state
  }
}
