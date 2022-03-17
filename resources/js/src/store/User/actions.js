export default {
  addUsersAction (context, payload) {
    context.commit('addUsersCommit', payload)
  },
  addUserAction (context, payload) {
    context.commit('addUserCommit', payload)
  }
}
