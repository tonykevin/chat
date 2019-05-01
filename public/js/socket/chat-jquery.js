var params = new URLSearchParams(window.location.search)

const divUsers = $('#divUsers')
const sendForm = $('#sendForm')
const txtMessage = $('#txtMessage')
const divChatBox = $('#divChatBox')

function renderUsers (users) {
  let html = `
    <li>
        <a href="javascript:void(0)" class="active">
          Chat de <span> ${params.get('room')}</span>
        </a>
    </li>
  `

  for (let i = 0; i < users.length; i++) {
    html += `
      <li>
        <a href="javascript:void(0)" data-id=${users[i].id}>
          <img
            alt="user-img"
            class="img-circle"
            src="assets/images/users/1.jpg"
          >
          <span>
            ${users[i].name}
            <small class="text-success">online</small>
          </span>
        </a>
      </li>
    `
  }

  divUsers.html(html)
}

function renderMessage (message) {
  let html = `
    <li class="animated fadeIn">
      <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
      <div class="chat-content">
        <h5>${message.name}</h5>
        <div class="box bg-light-info">${message.message}</div>
      </div>
      <div class="chat-time">10:56 am</div>
    </li>
  `
  divChatBox.append(html)
}

// Listeners
divUsers.on('click', 'a', ({ currentTarget }) => {
  let id = $(currentTarget).data('id')
  console.log(id)
})

sendForm.on('submit', (e) => {
  e.preventDefault()

  if (!txtMessage.val().trim().length) {
    return
  }

  socket.emit('createMessage', {
    message: txtMessage.val()
  }, (message) => {
    txtMessage.val('').focus()
    renderMessage(message)
  })
})
