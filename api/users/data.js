module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  patchUser,
}

const db = {
  users: [
    {
      id: 1,
      name: "Jane Doe",
      bio: "Not Tarzan's Wife, another Jane",
    },
  ],
  top_users: [],
}

function getIndex(id) {
  return db.users.findIndex((u) => u.id === Number(id))
}

function getUser(id) {
  if (id) {
    const index = getIndex(id)
    return db.users[index]
  } else {
    return db
  }
}

function addUser(user) {
  const newUser = { ...user, id: db.users.length + 1 }
  db.users.push(newUser)

  return newUser
}

function updateUser(id, newData) {
  const index = getIndex(id)

  console.log()

  db.users[index] = { ...db.users[index], ...newData }

  return db.users[index]
}

function deleteUser(id) {
  // find index of user with id
  const index = getIndex(id)
  const deleted = db.users.splice(index, 1)

  return { deleted }
}

function patchUser(patch) {
  switch (patch.op) {
    case "add":
      return patchAdd(patch)

    case "replace":

    case "remove":

    case "move":

    case "copy":

    case "test":

    default:
      return db.users
  }
}

function patchAdd(patch) {
  const { table, index } = parsePath(patch.path)

  if (index >= 0) {
    db[table].splice(index, 0, patch.value)
  } else {
    db[table].push(patch.value)
  }

  return db[table]
}

function parsePath(path) {
  const params = path.split("/").slice(1)
  let table, index, key

  if (params.length >= 1) {
    table = params[0]

    if (typeof Number(params[1]) === "number") {
      // param is a number
      index = Number(params[1])
    } else {
      // param is a string
      key = params[1]
    }
  }

  return { table, index, key }
}
