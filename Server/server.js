require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env

const app = express()

app.use(express.json())
app.use(cors())


const {seed, 
    postPerson, 
    makeMacro,
    getNames
} = require('./controller')

app.post('/person', postPerson)
app.put('/macro/:id',makeMacro)
app.get('/names', getNames)
app.post('/seed', seed)














app.listen(SERVER_PORT, () => console.log(`running on ${SERVER_PORT}`))