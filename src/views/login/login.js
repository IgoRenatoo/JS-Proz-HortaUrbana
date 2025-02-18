const loginForm = document.querySelector('.login-form')

loginForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  // Recupera os usuários cadastrados no localStorage
  const user = JSON.parse(localStorage.getItem('user'))

  if (user.username === username && user.password === password) {
    alert('Login realizado com sucesso!')
    localStorage.setItem('loggedIn', JSON.stringify(true)) 
    window.location.href = '../shop/micro-verde.html'
  } else {
    alert('Usuário ou senha incorretos!')
  }

  loginForm.reset()
})

const recoverPasswd = document.querySelector('#recoverPasswd')

recoverPasswd.addEventListener('click', function (event) {
  event.preventDefault()

  const user = JSON.parse(localStorage.getItem('user'))
  user ?
  alert(`Seu login é: ${user.username} \nSua senha é: ${user.password} \nPadrão LGPD - EUA`) :
  alert(`Você não está cadastrado!`)
})
