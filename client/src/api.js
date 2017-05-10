export default {
  LOGIN: () => `/api/Accounts/login`,
  LOGOUT: () => `/api/Accounts/logout`,
  CREATE_NOTE: (userId) => `/api/Accounts/${userId}/notes`,
  GET_NOTES: (userId) => `/api/Accounts/${userId}/notes`,
  DELETE_NOTE: (userId, noteId) => `/api/Accounts/${userId}/notes/${noteId}`,
  UPDATE_NOTE: (userId, noteId) => `/api/Accounts/${userId}/notes/${noteId}`,
  GET_NOTE: (userId, noteId) => `/api/Accounts//${userId}/notes/${noteId}`,
  GET_USER: (userId) => `/api/Accounts/${userId}?filter=%7B%22fields%22%3A%7B%22id%22%3Afalse%7D%7D`
}
