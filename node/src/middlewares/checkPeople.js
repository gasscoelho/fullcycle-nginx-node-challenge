import { getCount } from '#infra/repository/personRepository'

export default async function checkPeople(req, res, next) {
  const count = await getCount()
  if (count)
    return next()
  res.redirect('/')
}
