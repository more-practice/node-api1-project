const db = require("./api/users/data")
const express = require("express")
const server = express()

server.use(express.json())

server.get("/", (req, res) => {
  res.json({ message: "api running" })
})

server.get("/users", (req, res) => {
  const users = db.getUser()
  if (users) return res.status(200).json(users)

  if (!users)
    return res.status(400).json({ error: "Users could not be retrieved" })
})

server.get("/users/:id", (req, res) => {
  const id = req.params.id

  const user = db.getUser(id)

  if (user) {
    return res.status(200).json(user)
  } else {
    return res
      .status(400)
      .json({ error: "The user with the specified ID does not exist." })
  }
})

server.post("/users", (req, res) => {
  const newUser = req.body

  if (newUser.name && newUser.bio) {
    const user = db.addUser(newUser)
    return res.status(201).json(user)
  } else {
    return res
      .status(400)
      .json({ error: "Please provide name and bio for the user." })
  }
})

server.put("/users/:id", (req, res) => {
  const newUser = db.updateUser(req.params.id, req.body)

  res.status(200).json(newUser)
})

server.patch("/users", (req, res) => {
  const patched = db.patchUser(req.body)

  if (patched) {
    res.status(204).json(patched)
  } else {
    res.status(400).json({ error: "Could not patch user" })
  }
})

server.delete("/users/:id", (req, res) => {
  const id = req.params.id
  const deleted = db.deleteUser(id)

  return res.status(200).json(deleted)
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`server running on ${PORT}`))
