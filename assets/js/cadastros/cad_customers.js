class CadastroCliente {
  constructor() {
    this.urlCustomer = "http://localhost:3000/customers"
    this.accessToken = localStorage.getItem("accessToken");

    this.checkAuth();

    document.addEventListener('DOMContentLoaded', () => {
      this.btnCadastrar = document.querySelector('#btnCadastrar');
      if (this.btnCadastrar) {
        console.log("teste");

        this.registerNewCustomer()
      }
    });
  }

  checkAuth() {
    if (this.accessToken === null) {
      alert("Você precisa estar logado!")
      window.location.href = "/assets/html/signin.html";
    }
  }

  async registerNewCustomer() {
    try {
      if (this.btnCadastrar) {
        this.btnCadastrar.addEventListener("click", async (event) => {
          event.preventDefault()
          const dataCustomer = {
            name: document.querySelector("#inputNome").value,
            email: document.querySelector('#inputEmail').value,
            telephone: document.querySelector('#inputTelefone').value,
            status: document.querySelector('#cbAtivo').checked,
            address: document.querySelector('#inputEndereco').value,
            neighborhood: document.querySelector('#inputBairro').value,
            city: document.querySelector('#inputCidade').value,
            state: document.querySelector('#inputUf').value,
          }

          if (document.querySelector("#dateNascimento").value) {
            dataCustomer.birthDate = document.querySelector("#dateNascimento").value;
          }

          console.log("Dados do cliente:", dataCustomer);



          try {
            console.log(this.accessToken);
            const response = await axios.post(this.urlCustomer, dataCustomer, {

              headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
              }
            });
            if (response.status === 201) {

              document.location.href = "/index.html"
            }

          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log(error);
              this.divAlert.classList.add('alert');
              this.divAlert.classList.add('alert-danger');
              this.divAlert.classList.add('alert-dismissible');
              this.divAlert.innerHTML += `Erro: ${error.response?.status} - ${error.response?.data.message}`;
              this.divAlert.innerHTML += ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
              location.reload();
            } else {
              // Caso o erro não seja um AxiosError
              console.error("Erro inesperado:", error);
              alert("Erro inesperado. Verifique o console para mais detalhes.");
            }

          }
        }
        )
      }

    } catch (error) {
      console.log(error);

    }

  }


}

const cadstroCliente = new CadastroCliente();