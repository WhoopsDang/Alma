require('dotenv').config()
const express = require('express')
const db = require('./db')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//Api calls
app.use('/api/v1/patients', require('./routes/patient'))
app.use('/api/v1/states', require('./routes/states'))
app.use('/api/v1/modules', require('./routes/modules'))

const port = process.env.port || 3001;
app.listen(port, () =>{
    console.log(`Were up and running on port ${port}`)
})
