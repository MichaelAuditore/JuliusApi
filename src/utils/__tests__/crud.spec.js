import { getOne, getMany, createOne, updateOne, removeOne } from '../crud'
import { Post } from '../../resources/post/post.model'
import { User } from '../../resources/user/user.model'
import mongoose from 'mongoose'
import { me } from '../../resources/user/user.controllers'

describe('crud controllers', () => {
  describe('getOne', () => {
    test('finds by authenticated user and id', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()
      const post = await Post.create({
        url: 'fakeurl.com/img1',
        title: 'my Post',
        content: 'this is a fake post',
        createdBy: user
      })

      const req = {
        params: {
          id: post._id
        },
        user: {
          _id: user
        }
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(result) {
          expect(result.data._id.toString()).toBe(post._id.toString())
        }
      }

      await getOne(Post)(req, res)
    })

    test('404 if no doc was found', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()

      const req = {
        params: {
          id: mongoose.Types.ObjectId()
        },
        user: {
          _id: user
        }
      }

      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        end() {
          expect(true).toBe(true)
        }
      }

      await getOne(Post)(req, res)
    })
  })

  describe('getMany', () => {
    test('finds array of docs by authenticated user', async () => {
      expect.assertions(5)

      const user = mongoose.Types.ObjectId()
      await Post.create([
        {
          url: 'fakeurl.com/img1',
          title: 'my Post',
          content: 'this is a fake post',
          createdBy: user
        },
        {
          url: 'fakeurl.com/img2',
          title: 'my Post 2',
          content: 'this is a fake post 2',
          createdBy: user
        },
        {
          url: 'fakeurl.com/img3',
          title: 'my Post 3',
          content: 'this is a fake post 3',
          createdBy: user
        }
      ])

      const req = {
        user: {
          _id: user
        }
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(result) {
          expect(result.data).toHaveLength(3)
          result.data.forEach(doc => expect(`${doc.createdBy}`).toBe(`${user}`))
        }
      }

      await getMany(Post)(req, res)
    })
  })

  describe('createOne', () => {
    test('creates a new doc', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()
      const body = {
        url: 'fakeurl.com/img1',
        title: 'my Post',
        content: 'this is a fake post',
        createdBy: user
      }

      const req = {
        user: { _id: user },
        body
      }

      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        json(results) {
          expect(results.data.name).toBe(body.name)
        }
      }

      await createOne(Post)(req, res)
    })

    test('createdBy should be the authenticated user', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()
      const body = {
        url: 'fakeurl.com/img1',
        title: 'my Post',
        content: 'this is a fake post',
        createdBy: user
      }

      const req = {
        user: { _id: user },
        body
      }

      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        json(results) {
          expect(`${results.data.createdBy}`).toBe(`${user}`)
        }
      }

      await createOne(Post)(req, res)
    })
  })

  describe('updateOne', () => {
    test('finds doc by authenticated user and id to update', async () => {
      expect.assertions(3)

      const user = mongoose.Types.ObjectId()
      const post = await Post.create({
        url: 'fakeurl.com/img1',
        title: 'my Post',
        content: 'this is a fake post',
        createdBy: user
      })
      const update = { title: 'hello fake post' }

      const req = {
        params: { id: post._id },
        user: { _id: user },
        body: update
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${post._id}`)
          expect(results.data.name).toBe(update.name)
        }
      }

      await updateOne(Post)(req, res)
    })

    test('400 if no doc', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()
      const update = { name: 'hello' }

      const req = {
        params: { id: mongoose.Types.ObjectId() },
        user: { _id: user },
        body: update
      }

      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        end() {
          expect(true).toBe(true)
        }
      }

      await updateOne(Post)(req, res)
    })
  })

  describe('removeOne', () => {
    test('first doc by authenticated user and id to remove', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()
      const post = await Post.create({
        url: 'fakeurl.com/img1',
        title: 'my Post',
        content: 'this is a fake post',
        createdBy: user
      })

      const req = {
        params: { id: post._id },
        user: { _id: user }
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${post._id}`)
        }
      }

      await removeOne(Post)(req, res)
    })

    test('400 if no doc', async () => {
      expect.assertions(2)
      const user = mongoose.Types.ObjectId()

      const req = {
        params: { id: mongoose.Types.ObjectId() },
        user: { _id: user }
      }

      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        end() {
          expect(true).toBe(true)
        }
      }

      await removeOne(Post)(req, res)
    })
  })

  describe('get User', () => {
    test('get data for current user', async () => {
      expect.assertions(2)

      const userToCreate = {
        username: 'michaelAuditore',
        email: 'michael_v613@hotmail.com',
        password: 'Proof123*'
      }

      const user = await User.create(userToCreate)

      const req = {
        user: {
          _id: user
        }
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(results) {
          expect(`${results.data}`).toBe(`${req.user}`)
        }
      }

      await me(req, res)
    })
  })

  describe('update User', () => {
    test('update current user', async () => {})
  })
})
