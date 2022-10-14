const router = require("express").Router()
const userController = require("./user.controller")

router.route("/signup").post(userController.signup)


module.exports = router