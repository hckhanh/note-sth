import axios from 'axios'

function publishData(app, action, data) {
  const channel = app.get('channel')
  data.sessionId = app.get('sessionId')

  if (channel) {
    channel.publish(action, data)
  }
}

export function getNotes() {
  return (dispatch, getState, { api }) => {
    const user = getState().app.get('user')

    dispatch({ type: 'LOAD_APP' })
    axios
      .get(api.GET_NOTES(user.get('userId')), {
        headers: { 'Authorization': user.get('id') }
      })
      .then(({ data: notes }) => {
        dispatch({ type: 'LOAD_NOTES', notes })
        dispatch({ type: 'LOAD_APP_DONE' })
      })
      .catch((error) => {
        console.error(error)
        dispatch({ type: 'LOAD_APP_DONE' })
      })
  }
}

export function createNote(note) {
  return (dispatch, getState, { api }) => {
    const { app } = getState()
    const user = app.get('user')

    axios
      .post(api.CREATE_NOTE(user.get('userId')), note, {
        headers: { 'Authorization': user.get('id') }
      })
      .then(({ data: note }) => {
        dispatch({ type: 'ADD_NOTE', note })
        publishData(app, 'add', {
          noteId: note.id
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export function deleteNote(noteId) {
  return (dispatch, getState, { api }) => {
    const { app } = getState()
    const user = app.get('user')

    axios
      .delete(api.DELETE_NOTE(user.get('userId'), noteId), {
        headers: { 'Authorization': user.get('id') }
      })
      .then(() => {
        dispatch({ type: 'DELETE_NOTE', noteId })
        publishData(app, 'delete', {
          noteId
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export function updateNote(noteId, content) {
  return (dispatch, getState, { api }) => {
    const { app } = getState()
    const user = app.get('user')

    axios
      .put(api.UPDATE_NOTE(user.get('userId'), noteId), content, {
        headers: { 'Authorization': user.get('id') }
      })
      .then(({ data: note }) => {
        dispatch({ type: 'UPDATE_NOTE', note })
        publishData(app, 'update', {
          noteId: note.id
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export function updateFromClient(action, { noteId }) {
  return (dispatch, getState, { api }) => {
    const user = getState().app.get('user')

    switch (action) {
      case 'delete':
        dispatch({ type: 'DELETE_NOTE', noteId })
        break
      case 'add':
        axios
          .get(api.GET_NOTE(user.get('userId'), noteId), {
            headers: { 'Authorization': user.get('id') }
          })
          .then(({ data: note }) => {
            dispatch({ type: 'ADD_NOTE', note })
          })
          .catch((error) => {
            console.error(error)
          })
        break
      case 'update':
        axios
          .get(api.GET_NOTE(user.get('userId'), noteId), {
            headers: { 'Authorization': user.get('id') }
          })
          .then(({ data: note }) => {
            dispatch({ type: 'UPDATE_NOTE', note })
          })
          .catch((error) => {
            console.error(error)
          })
    }
  }
}
