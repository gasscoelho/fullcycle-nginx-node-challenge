import { getAll } from '#infra/repository/personRepository'
import { generateAvatar } from '#lib/avatars'
import titlelize from '#utils/titlelize'

export default async function getPeople() {
  const people = await getAll()
  return people.map(person => ({
    id: person.id,
    firstName: person.firt_name,
    lastName: person.last_name,
    fullName: `${titlelize(person.first_name)} ${titlelize(person.last_name)}`,
    avatar: generateAvatar(`${person.first_name}-${person.lastName}-avatar`),
  }))
}
