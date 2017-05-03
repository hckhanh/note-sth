import axios from 'axios'

export function createNote(note) {
  return (dispatch, getState, { api }) => {
    const user = getState().app.get('user')

    axios.post(api.CREATE_NODE(user.get('userId')), note, {
        headers: { 'Authorization': user.get('id') }
      })
      .then(() => {
        // TODO: Load all notes after create a note
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
