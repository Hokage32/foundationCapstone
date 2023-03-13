const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())


const {postPerson} = require('./controller')

app.post('/person', postPerson)














app.listen(4000, () => console.log('running on server 4000'))