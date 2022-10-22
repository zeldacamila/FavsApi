const { Router } = require('express')
const { isAuthenticated } = require('../../middelware/authentication')
const { create, show, list, destroy, addFavs } = require('./favsList.controller')

const router = Router()

router.post('/', isAuthenticated, create)
router.get('/', isAuthenticated, show)

router.get('/:favsListId', isAuthenticated, list)
router.delete('/:favsListId', isAuthenticated, destroy)
router.put('/:favsListId', isAuthenticated, addFavs)

module.exports = router
