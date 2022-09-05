const express = require('express')
const router = express.Router()

const {signin, signup, deleteAccount} = require('../controllers/userAuth.js')
const {jwtAuth} = require('../middleware/jwtAuth')

router.post('/signin', signin)
router.post('/signup', signup)
router.delete('/deleteAccount', jwtAuth, deleteAccount)

module.exports = router