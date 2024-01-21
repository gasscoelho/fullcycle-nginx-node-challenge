export default function checkPeople(personRepository) {
  return async (req, res, next) => {
    const count = await personRepository.getCount()
    if (count)
      return next()
    res.redirect('/')
  }
}
