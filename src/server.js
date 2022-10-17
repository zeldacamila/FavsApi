require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { connect } = require('./database')
const favsListRoute = require('./favsAPI/favsList/favsList.route')
const userRoute = require('./favsAPI/user/user.route')

const app = express()
const port = process.env.PORT || 8082
connect()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/favs', favsListRoute)
app.use('/auth/local', userRoute)


app.listen((port), () => {
  console.log(`Server successfully connected to port ${port}`)
})

