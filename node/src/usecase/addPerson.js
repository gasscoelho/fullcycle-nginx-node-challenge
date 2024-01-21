export default function addPerson(personRepository) {
  return async ({ firstName, lastName }) => {
    const sanitizedFirstName = firstName.trim().toUpperCase()
    const sanitizedLastName = lastName.trim().toUpperCase()
    await personRepository.insert({ firstName: sanitizedFirstName, lastName: sanitizedLastName })
  }
}
