import express from 'express'

import { getUsers, addUser } from './respository/userRepository'

const app = express()

app.get('/', (req, res) => {
    const users = ['Diego', 'Luis', 'Carlos', 'Jorge']
    return res.json({ users })
})

app.listen(3333)