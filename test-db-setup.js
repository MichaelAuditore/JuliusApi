import _ from 'lodash'
import cuid from 'cuid'
import mongoose from 'mongoose'
import { Post } from './src/resources/post/post.model'
import { User } from './src/resources/user/user.model'

const models = { User, Post }

const url =
  process.env.MONGODB_URI ||
  process.env.DB_URL ||
  'mongodb://localhost:27017/julius-test'

global.newId = () => {
  return mongoose.Types.ObjectId()
}

const remove = collection =>
  new Promise((resolve, reject) => {
    collection.deleteMany(err => {
      if (err) return reject(err)
      resolve()
    })
  })

beforeEach(async done => {
  const db = cuid()
  function clearDB() {
    return Promise.all(_.map(mongoose.connection.collections, c => remove(c)))
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url + db, {
        useNewUrlParser: true,
        autoIndex: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      await clearDB()
      await Promise.all(Object.keys(models).map(name => models[name].init()))
    } catch (e) {
      console.log('connection error')
      console.error(e)
      throw e
    }
  } else {
    await clearDB()
  }
  done()
})
afterEach(async done => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
  return done()
})
afterAll(done => {
  return done()
})
