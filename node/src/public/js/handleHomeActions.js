document.addEventListener('DOMContentLoaded', () => {
  const navigateToAddPerson = document.getElementById('navigateToAddPerson')
  const navigateToRemovePeople = document.getElementById('navigateToRemovePeople')
  navigateToAddPerson.addEventListener('click', () => location.href = '/person/add')
  navigateToRemovePeople.addEventListener('click', () => location.href = '/people/remove')
})
