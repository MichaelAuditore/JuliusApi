import { merge } from 'lodash'
const env = process.env.NODE_ENV

const baseConfig = {
  env,
  isDev: env === 'development',
  isProd: env === 'prod',
  isTest: env === 'testing',
  port: 3100,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '1h'
  }
}

let envConfig = {}

switch (env) {
  case 'development':
    envConfig = require('./dev').config
    break
  case 'testing':
    envConfig = require('./testing').config
    break
  case 'prod':
    envConfig = require('./prod').config
    break
  default:
    envConfig = require('./prod').config
}

export default merge(baseConfig, envConfig)
