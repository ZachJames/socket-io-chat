const users = []

const addUser = ({ id, username, userColor }) => {
  console.log('> Adding user')
  const newUser = { id, username, userColor }
  users.push(newUser)
  return { newUser }
}

const deleteUser = id => {
  console.log('> Deleting user')
  const index = users.findIndex(user => user.id === id)
  if (index !== -1) return users.splice(index, 1)[0]
}

const getUser = id => users.find(user => user.id === id)

const getNumUsersInChat = () => users.length

module.exports = { addUser, deleteUser, getUser, getNumUsersInChat }
