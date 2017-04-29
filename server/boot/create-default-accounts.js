module.exports = app => {
  const { Account, Role, RoleMapping } = app.models

  // Find accounts in the system
  Account.find({ where: { username: { inq: ['hckhanh', 'demo'] } } }, (error, users) => {
    if (error) throw error

    // If the default accounts are not existed, create them
    if (users.length === 0) {
      Account.create([
        {
          email: 'hoangchaukhanh93@gmail.com',
          password: 'admin123',
          username: 'hckhanh'
        },
        {
          email: 'demo@example.com',
          password: 'demo',
          username: 'demo'
        }
      ], (error, users) => {
        if (error) throw error

        // Create "admin" role
        Role.findOrCreate({ name: 'admin' }, (error, role) => {
          if (error) throw error

          // Create admin mapping to admin user
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[0].id
          }, (error, principal) => {
            if (error) throw error
          })
        })

        // Create "demo" role
        Role.findOrCreate({ name: 'demo' }, (error, role) => {
          if (error) throw error

          // Create admin mapping to admin user
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[1].id
          }, (error, principal) => {
            if (error) throw error
          })
        })
      })
    }
  })
}
