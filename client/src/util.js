function isTokenExpired(user) {
  return user.get('created') + user.get('ttl') <= Date.now()
}

export function isAuthenticated(user) {
  return !user.isEmpty() && !isTokenExpired(user)
}
