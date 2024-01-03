function showRemoveButton() {
  const element = document.querySelector('.selected-items-container')
  element.style.display = 'flex'
}

function hideRemoveButton() {
  const element = document.querySelector('.selected-items-container')
  element.style.display = 'none'
}

function getSelectedPeople() {
  const selected = document.querySelectorAll('input[name="peopleId"]:checked')
  return Array.from(selected).map(checkbox => checkbox.value)
}

function updateSelectedCountLabel(count) {
  const label = count === 1 ? 'person' : 'people'
  document.querySelector('.selected-items-container span').textContent = `${count} ${label} selected`
}

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

function hideContent() {
  const mainContent = document.getElementById('rm-main-container')
  const headerContent = document.querySelector('.rm-header-container')
  mainContent.style.display = 'none'
  headerContent.style.display = 'none'
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.person-row').forEach((row) => {
    row.addEventListener('click', (event) => {
      if (event.target.type === 'checkbox')
        return
      const checkbox = row.querySelector('input[type="checkbox"]')
      checkbox.checked = !checkbox.checked
      checkbox.dispatchEvent(new Event('change'))
    })
  })

  document.querySelectorAll('.custom-checkbox input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      checkbox.closest('.person-row').classList.toggle('person-row-active', checkbox.checked)
      const selectedCount = getSelectedPeople().length
      updateSelectedCountLabel(selectedCount)
      if (selectedCount > 0)
        showRemoveButton()
      else
        hideRemoveButton()
    })
  })

  const removeButton = document.querySelector('.selected-items-container .btn a')
  removeButton.addEventListener('click', async () => {
    const response = await fetch('/api/people', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ ids: getSelectedPeople() }),
    })
    if (response.ok) {
      const message = `${getSelectedPeople().length === 1 ? 'Person has' : 'People have'} been successfully deleted from the system`
      showResultMessage({ type: 'success', message })
    }
    else {
      showResultMessage({ type: 'error' })
    }
    hideContent()
    hideRemoveButton()
  })
})
