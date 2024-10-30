const Router = require('express')
const router = new Router()
const controllers = require('../controllers/controllers')

router.post('/userAuth', controllers.userAuth)
router.post('/deleteSite', controllers.deleteSite)

module.exports = router
