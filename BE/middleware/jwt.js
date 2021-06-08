const createError = require('http-errors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.get('Authorization').split(' ')[1]

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log('decodeToken: ', decodeToken)
    req.user = decodeToken

    next()
  } catch {
    next(createError(500, 'Invalid token!'))
  }
}
