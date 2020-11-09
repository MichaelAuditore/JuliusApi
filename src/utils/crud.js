/**
 * getOne - function to get an specific data from a model
 * @param {*} model
 */
export const getOne = model => async (req, res) => {
  try {
    const doc = await model
      .findOne({ createdBy: req.user._id, _id: req.params.id })
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

/**
 * getMatch - function to get an specific data from a model based in match param
 * @param {*} model
 */
export const getMatch = model => async (req, res) => {
  try {
    const docs = await model
      .find({
        $or: [
          {
            title: { $regex: '.*' + req.params.postMatch + '.*' }
          },
          {
            content: { $regex: '.*' + req.params.postMatch + '.*' }
          }
        ]
      })
      .lean()
      .exec()

    if (!docs) {
      res.status(400).end()
    }

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

/**
 * getMany - get all data from a model
 * @param {*} model
 */
export const getMany = model => async (req, res) => {
  try {
    const docs = await model
      .find({ createdBy: req.user._id })
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

/**
 * createOne - create one data in model
 * @param {*} model
 */
export const createOne = model => async (req, res) => {
  const createdBy = req.user._id
  try {
    const doc = await model.create({ ...req.body, createdBy })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

/**
 * updateOne - update one data in model
 * @param {*} model
 */
export const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

/**
 * removeOne - remove one data from model
 * @param {*} model
 */
export const removeOne = model => async (req, res) => {
  try {
    const removed = await model
      .findOneAndRemove({
        createdBy: req.user._id,
        _id: req.params.id
      })
      .exec()

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

/**
 * crudCntrollers - a list of objects to implement functions in models
 * @param {*} model
 */
export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  getMatch: getMatch(model),
  createOne: createOne(model)
})
