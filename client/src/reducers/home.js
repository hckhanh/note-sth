import { List, Map } from 'immutable'
import * as React from 'react'

const INITIAL_STATE = Map({
  notes: List(),
  user: Map(JSON.parse(localStorage.getItem('user')))
})

export default function(state = INITIAL_STATE, { type, notes }) {
  switch (type) {
    case 'LOAD_NOTES_DONE':
      return state.merge({ notes })
    default:
      return state
  }
}
