const URLLOGIN = "http://localhost:3000/auth/login";
let btn = document.querySelector('.fa-eye')

// mostra oculta senha
btn.addEventListener('click', () => {
  let inputPassword = document.querySelector('#password')

  if (inputPassword.getAttribute('type') == 'password') {
    inputPassword.setAttribute('type', 'text')
  } else {
    inputPassword.setAttribute('type', 'password')
  }
})

async function entrar() {
  const borderLogin = document.getElementById("email");
  let loginLabel = document.querySelector('#loginLabel')


  let borderPassword = document.querySelector('#password')
  let passwordLabel = document.querySelector('#passwordLabel')

  let msgError = document.querySelector('#msgError')

  const login = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(login);
  console.log(password);
  
  try {
    const response = await axios.post(URLLOGIN, new URLSearchParams({
      email: login,
      password: password
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.status === 201) {
      var accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      window.location.href = "../../index.html"
    }

  } catch (error) {
    if (error.response) {
      loginLabel.setAttribute('style', 'color: red')
      borderLogin.setAttribute('style', 'border-color: red')
      borderPassword.setAttribute('style', 'border-color: red')
      passwordLabel.setAttribute('style', 'color: red')
      msgError.setAttribute('style', 'display: block')
      msgError.innerHTML = `${error.response.data.message}`
      borderLogin.focus()
    } else {
      console.error('Error message:', error.message);
    }
  }

}