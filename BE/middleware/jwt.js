const createError = require('http-errors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authModel = require('../model/auth')

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.get('Authorization').split(' ')[1]

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    // console.log('decodeToken: ', decodeToken)
    req.user = decodeToken

    next()
  } catch {
    next(createError(500, 'Invalid token!'))
  }
}

exports.checkAdminRole = async (req, res, next) => {
  try {
    const [isAdmin] = await authModel.adminById(req.user.id)
    console.log(isAdmin)

    if (!isAdmin.length) {
      return next(createError(401, 'Not authorize'))
    }

    next()
  } catch (e) {
    console.log(e)
    next(createError(401, 'Not authorize'))
  }
}
