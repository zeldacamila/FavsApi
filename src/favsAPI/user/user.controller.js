const { User } = require('./user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const signup = async (req, res) => {
  try {
    const { password, email } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: passwordHash })
    const token = jwt.sign({ id: user._id }, "secretKey", {expiresIn: 60 * 60 * 24})
    return res.status(201).json(token)
  } catch {
    return res.status(400).json('User cannot be created')
  }
}

module.exports = { signup }