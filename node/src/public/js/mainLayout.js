document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear()
  const name = 'Gabriel Coelho'
  const copyRightText = `&copy; ${year} Developed by ${name}`
  document.querySelector('.copyright').innerHTML = copyRightText
})
