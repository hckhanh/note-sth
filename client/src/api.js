export default {
  LOGIN: () => `/api/Accounts/login`,
  LOGOUT: () => `/api/Accounts/logout`,
  CREATE_NODE: (userId) => `/api/Accounts/${userId}/notes`
}
