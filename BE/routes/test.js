const router = require('express').Router()

const { postSignup, postLogin } = require('../controllers/test')

router.post('/signup', postSignup)

router.post('/login', postLogin)

module.exports = router
