import axios from 'axios'

export function login(account) {
  return (dispatch, getState, { api }) => {
    axios.post(api.LOGIN(), account)
      .then(({ data: user }) => {
        dispatch({ type: 'LOGIN', user })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export function logout() {
  return (dispatch, getState, { api }) => {
    const state = getState()

    axios.post(api.LOGOUT(), null, {
        headers: { 'Authorization': state.app.getIn(['user', 'id']) }
      })
      .then(() => {
        dispatch({ type: 'LOGOUT' })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
