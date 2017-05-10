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
    const { app } = getState()

    axios.post(api.LOGOUT(), null, {
        headers: { 'Authorization': app.getIn(['user', 'id']) }
      })
      .then(() => {
        dispatch({ type: 'LOGOUT' })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export function loadChannel(channel) {
  return { type: 'LOAD_CHANNEL', channel }
}

export function getUserData() {
  return (dispatch, getState, { api }) => {
    const user = getState().app.get('user')

    axios
      .get(api.GET_USER(user.get('userId')), {
        headers: { 'Authorization': user.get('id') }
      })
      .then(({ data: userData }) => {
        dispatch({ type: 'GET_USER_DATA', userData })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
