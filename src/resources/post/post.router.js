import { Router } from 'express'
import controllers from './post.controllers'

const router = Router()

// api/posts
router
  .route('/')
  .post(controllers.createOne)
  .get(controllers.getMany)

// api/posts/:postMatch
router.route('/match/:postMatch').get(controllers.getMatch)

// api/posts/:postId
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
