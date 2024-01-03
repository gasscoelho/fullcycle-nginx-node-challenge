import express from 'express'
import checkPeople from '#middlewares/checkPeople'
import getPeople from '#usecase/getPeople'
import { generateAvatar } from '#lib/avatars'

const router = express.Router()

router.get('/', async (req, res) => {
  const people = await getPeople()
  res.render('index', {
    addAvatar: generateAvatar('add-avatar'),
    removeAvatar: generateAvatar('remove-avatar'),
    people,
  })
})

router.get('/person/add', (req, res) => {
  res.render('add')
})

router.get('/people/remove', checkPeople, async (req, res) => {
  const people = await getPeople()
  res.render('remove', { people })
})

export default router
