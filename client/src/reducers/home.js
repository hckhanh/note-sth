import { fromJS, List, Map } from 'immutable'
import React from 'react'

const INITIAL_STATE = Map({
  notes: List()
})

export default function(state = INITIAL_STATE, { type, ...data }) {
  switch (type) {
    case 'LOAD_NOTES':
      return state.set('notes', fromJS(data.notes))
    case 'ADD_NOTE':
      return state.update('notes', notes => notes.push(fromJS(data.note)))
    case 'DELETE_NOTE':
      return state.update('notes', notes => {
        const noteIndex = notes.findIndex(note => note.get('id') === data.noteId)
        return notes.delete(noteIndex)
      })
    case 'UPDATE_NOTE':
      const { note: newNote } = data

      return state.update('notes', notes => {
        const noteIndex = notes.findIndex(note => note.get('id') === newNote.id)
        return notes.update(noteIndex, oldNote => oldNote.merge(newNote))
      })
    default:
      return state
  }
}
