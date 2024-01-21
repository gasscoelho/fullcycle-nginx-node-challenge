export default function bulkDeletePeople(personRepository) {
  return async (ids) => {
    await personRepository.deleteMany(ids)
  }
}
