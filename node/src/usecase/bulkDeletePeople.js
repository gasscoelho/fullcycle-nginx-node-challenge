import { deleteMany } from '#infra/repository/personRepository'

export default async function bulkDeletePeople(ids) {
  await deleteMany(ids)
}
