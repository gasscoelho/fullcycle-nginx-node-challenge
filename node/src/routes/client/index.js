import express from 'express'
import { generateAvatar } from '#lib/avatars'

export default function clientMainController(
  getPeople,
  checkPeople,
) {
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

  return router
}
