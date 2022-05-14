const express = require('express')
const router = express.Router()

const authenticateToken = require('../middlewares/token/authenticateToken')
const userController = require('../controllers/users/users.controller')

router.patch('/', authenticateToken, userController.update)
router.get('/:username', userController.get)
router.get('/:username/like/:id', userController.isLiked)
router.post('/reset/password', userController.resetPassword)

module.exports = router