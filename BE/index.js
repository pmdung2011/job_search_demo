const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const jobRoutes = require('./routes/jobs')
const testRoutes = require('./routes/test')

const app = express()
const PORT = process.env.PORT || 4000

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/auth', authRoutes)
app.use('/jobs', jobRoutes)
app.use('/test', testRoutes)

// error handling
app.use((err, req, res, next) => {
  const { status = 500, message = 'An error has occurred. Please try again!' } =
    err

  res.status(status).json({ message })
})

app.listen(PORT, () => {
  console.log('🚀 ~ file: index.js ~ line 25 ~ app.listen ~ PORT', PORT)
})
