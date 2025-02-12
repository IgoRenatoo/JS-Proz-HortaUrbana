const registerForm = document.querySelector('#register-form')

registerForm.addEventListener('submit', function (event) {
  event.preventDefault()

  // Captura os dados do formulário
  const username = document.getElementById('new-username').value
  const password = document.getElementById('new-password').value

  // Validação básica de senha
  if (password.length < 4) {
    alert('A senha deve ter no mínimo 4 caracteres.')
    return
  }

  // Cria o objeto de usuário
  const user = {
    username: username,
    password: password,
  };

  // Armazena o usuário em localStorage
  localStorage.setItem('user', JSON.stringify(user));

  // Feedback para o usuário
  alert('Conta criada com sucesso!')
  window.location.href = '../login/login.html'
})

