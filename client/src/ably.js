import Ably from 'ably/browser/static/ably'

export default function(userId, authKey) {
  return new Ably.Realtime({
    authUrl: `/api/Accounts/${userId}/socketToken`,
    authHeaders: {
      Authorization: authKey
    }
  })
}
