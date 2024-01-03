function showResultMessage({ type, message }) {
  if (type === 'success') {
    const successDiv = document.getElementById('success-result-container')
    const contentElement = document.querySelector('#success-result-container p')
    contentElement.textContent = message
    successDiv.style.display = 'flex'
  }
  else if (type === 'error') {
    const errorDiv = document.getElementById('error-result-container')
    errorDiv.style.display = 'flex'
  }
}

function hideResultMessage() {
  const successDiv = document.getElementById('success-result-container')
  const errorDiv = document.getElementById('error-result-container')
  successDiv.style.display = 'none'
  errorDiv.style.display = 'none'
}

function showForm() {
  const formContainer = document.getElementById('form-container')
  formContainer.style.display = 'block'
}

function hideForm() {
  const formContainer = document.getElementById('form-container')
  formContainer.style.display = 'none'
}

async function handleFormSubmit({ event, form }) {
  event.preventDefault()
  const formData = new FormData(form)
  const formDataSerialized = JSON.stringify(Object.fromEntries(formData))
  const response = await fetch('/api/person', {
    method: 'POST',
    body: formDataSerialized,
    headers: {
      'content-type': 'application/json',
    },
  })
  if (response.ok) {
    const data = await response.json()
    const { first_name, last_name } = data
    const message = `${first_name} ${last_name} has been added to the system`
    showResultMessage({ type: 'success', message })
  }
  else {
    showResultMessage({ type: 'error' })
  }
  form.reset()
  hideForm()
}

function handleResetLink({ event }) {
  event.preventDefault()
  hideResultMessage()
  showForm()
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('person-form')
  const resetLink = document.querySelector('.result-reset')
  form.addEventListener('submit', event => handleFormSubmit({ event, form }))
  resetLink.addEventListener('click', event => handleResetLink({ event }))
})
