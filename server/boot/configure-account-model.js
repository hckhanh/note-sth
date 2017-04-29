module.exports = app => {
  const { Account } = app.models
  app.dataSources.noteSth.autoupdate('Account', (error) => {
    if (error) throw error

    // Disable "create" method for Account model
    Account.disableRemoteMethodByName('create')
  })
}
