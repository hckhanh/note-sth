import { fromJS, List, Map } from 'immutable'
import React from 'react'

const INITIAL_STATE = Map({
  notes: List()
})

export default function(state = INITIAL_STATE, { type, notes, noteId, note }) {
  switch (type) {
    case 'LOAD_NOTES':
      return state.set('notes', fromJS(notes))
    case 'ADD_NOTE':
      return state.update('notes', notes => notes.push(fromJS(note)))
    case 'DELETE_NOTE':
      return state.update('notes', notes => {
        const noteIndex = notes.findIndex(note => note.get('id') === noteId)
        return notes.delete(noteIndex)
      })
    case 'UPDATE_NOTE':
      return state.update('notes', notes => {
        const noteIndex = notes.findIndex(note => note.get('id') === noteId)
        return notes.update(noteIndex, oldNote => oldNote.merge(note))
      })
    default:
      return state
  }
}
