import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ message: 'Username, Email and Password are Required' })
  }
  const user = await User.findOne({ email: req.body.email }).exec()
  if (user) {
    return res
      .status(401)
      .send({ message: 'User with that email already exists' })
  }
  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({
      tokenId: token,
      email: user.email,
      userId: user._id
    })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Email and Password are Required' })
  }

  const user = await User.findOne({ email: req.body.email }).exec()
  if (!user) {
    return res.status(401).send({ message: "User doesn't Exists" })
  }
  try {
    const match = await user.checkPassword(req.body.password)
    if (!match) {
      return res.status(401).send({ message: "Password doesn't matches" })
    }
    const token = newToken(user)
    return res.status(201).send({
      tokenId: token,
      email: user.email,
      userId: user._id
    })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }
  let token = req.headers.authorization.split('Bearer ')[1]
  if (!token) {
    return res.status(401).end()
  }
  try {
    const payload = await verifyToken(token)
    const user = await User.findById(payload.id)
      .select('-password')
      .lean()
      .exec()
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    if (e.name === 'TokenExpiredError') {
      return res.status(403).send({
        status: 403,
        success: false,
        message: 'Token Expired'
      })
    }
    return res.status(401).end()
  }
}
