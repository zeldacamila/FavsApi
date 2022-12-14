const User = require('./user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const listUsers = async (req, res) => {
  try {
    const users = await User.find()
    console.log(users)
    res.status(200).json({message: 'Users found', data: users })
  } catch (err) {
    res.status(400).json({message: 'Users cannot be found', data: err })
  }
}

const findOneUser = async (req, res) => {
  try {
    const  { userId } = req.params
    const user = await User.findById(userId)
    res.status(200).json({message: 'User found', data: user })
  } catch (err) {
    res.status(400).json({message: 'User cannot be found', data: err })
  }
}

const destroy = async (req, res) => {
  try {
    const { userId } = req.params
    const userRemoved = await User.findByIdAndDelete(userId)
    res.status(200).json({message: 'User deleted successfully', data: userRemoved})
  } catch (err) {
    res.status(400).json({message: 'User cannot be deleted', data: err})
  }
}

const signup = async (req, res) => {
  try {
    const { password, email } = req.body
    const passRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
    const validatePassword = passRegexp.test(password)
    if (!validatePassword) {
      return res.status(400).json({message: 'The password must be at least 8-16 characters long, with at least one digit, one lowercase, one uppercase, and one non-alphanumeric character.'});
    } else {
      const passwordHash = await bcrypt.hash(password, 10)
      const user = await User.create({ email, password: passwordHash })
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24})
   
      return res.status(201).json(token)
    }
  } catch (err) {
    return res.status(400).json({message: 'User cannot be created', data: err})
  }
}

const login = async (req, res) => {
  try {
    const { password, email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Invalid credentials')
    }
    const validatePassword = await bcrypt.compare(password, user.password)
    if (!validatePassword) {
      throw new Error('Invalid credentials')
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })
    return res.status(200).json(token)
  } catch (error) {
    return res.status(400).json({message: 'user cant login', data: error.message})
  }
}

module.exports = { signup, login, listUsers, findOneUser, destroy }