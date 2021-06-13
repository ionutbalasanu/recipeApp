const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')


deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sarmale'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'Sarmale deleted.') {
          message.textContent = 'No sarmale recipe to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
  })
  