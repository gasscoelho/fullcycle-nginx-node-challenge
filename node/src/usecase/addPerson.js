import { insert } from '#infra/repository/personRepository'

export default async function addPerson({ firstName, lastName }) {
  const sanitizedFirstName = firstName.trim().toUpperCase()
  const sanitizedLastName = lastName.trim().toUpperCase()
  await insert({ firstName: sanitizedFirstName, lastName: sanitizedLastName })
}
