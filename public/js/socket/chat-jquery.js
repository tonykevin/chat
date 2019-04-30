var params = new URLSearchParams(window.location.search)

const divUsers = $('#divUsers')

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
        <a href="javascript:void(0)">
          <img
            alt="user-img"
            class="img-circle"
            data-id=${users[i].id}
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
