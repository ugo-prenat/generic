const express = require('express')
const router = express.Router()

const authenticateToken = require('../middlewares/token/authenticateToken')
const componentController = require('../controllers/components/export.controller')


router.post('/', authenticateToken, componentController.create)
router.get('/', componentController.get)

router.delete('/', (req, res) => {
  console.log(req.body);
})

module.exports = router