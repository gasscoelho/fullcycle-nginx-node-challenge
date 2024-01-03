import express from 'express'
import logger from '#infra/logger/index'
import bulkDeletePeople from '#usecase/bulkDeletePeople'
import addPerson from '#usecase/addPerson'
import titlelize from '#utils/titlelize'

const router = express.Router()

router.post('/api/person', async (req, res) => {
  try {
    const { firstName, lastName } = req.body
    await addPerson({ firstName, lastName })
    res.json({
      first_name: titlelize(firstName),
      last_name: titlelize(lastName),
    })
  }
  catch (error) {
    logger.error(error)
    res.status(500).send({ error: 'Server error occurred' })
  }
})

router.delete('/api/people', async (req, res) => {
  try {
    const ids = req.body.ids
    await bulkDeletePeople(ids)
    res.status(204).send()
  }
  catch (error) {
    logger.error(error)
    res.status(500).send({ error: 'Server error occurred' })
  }
})

export default router
