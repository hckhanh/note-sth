import { Map } from 'immutable'
import * as React from 'react'

const INITIAL_STATE = Map({
  loading: true,
  user: Map(JSON.parse(localStorage.getItem('user')))
})

export default function(state = INITIAL_STATE, { type, user }) {
  switch (type) {
    case 'LOAD_APP':
      return state.merge({ loading: true })
    case 'LOAD_APP_DONE':
      return state.merge({ loading: false })
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(user))
      return state.merge({ user })
    case 'LOGOUT':
      localStorage.removeItem('user')
      return state.merge({ user: Map() })
    default:
      return state
  }
}
