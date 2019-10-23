const express = require('express')
const app = express()

const connectDB = require('./config/db' )
// connecct to data base

connectDB() //el usuario es davidroman y el pass es : sandra1234

app.use(express.json({ extended: true}))

app.use('/register', require('./routes/register')) 

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log (`Server started at port ${PORT} haha te me cuidas`))