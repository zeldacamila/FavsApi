const router = require('express').Router()
const favsListController = require('./favsList.controller')

router.route('/').get(favsListController.show)
router.route('/').post(favsListController.create)
router.route('/:favsListId').get(favsListController.list)
router.route('/:favsListId').delete(favsListController.destroy)

module.exports = router