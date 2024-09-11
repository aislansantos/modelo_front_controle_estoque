class LoadIndex {
  constructor() {
    this.baseURL = "http://localhost:3000";
    this.accessToken = localStorage.getItem("accessToken");

    this.apiConnection = axios.create({
      baseURL: this.baseURL, // Definindo a URL base
      headers: {
        'Authorization': `Bearer ${this.accessToken}`  // Configurando o header Authorization
      }
    });

    this.checkAuth(); // Verificar autenticação
    this.menuHamburger(); // Configurar botão de hamburger
    this.loadWelcome(); // Carregar a mensagem de boas-vindas
    this.loadScreen(); // Configurar carregamento de telas\
  };

  checkAuth() {
    if (this.accessToken === null) {
      alert("Você precisa estar logado para acessar esta página.");
      window.location.href = "./assets/html/signin.html";
    }
  }

  menuHamburger() {
    const hamburger = document.querySelector("#toggle-btn");
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        const sidebar = document.querySelector("#sidebar");
        if (sidebar) {
          sidebar.classList.toggle("expand");
        }
      });
    }
  }

  async loadWelcome() {
    try {
      const response = await this.apiConnection.post('auth/me');
      const nameData = response.data.name;
      const nameUser = nameData.toUpperCase();
      const nameElement = document.querySelector("#welcomeMessage")
      if (nameElement) {
        nameElement.innerHTML = `Seja bem-vindo, <b>${nameUser}</b>!`;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async loadScreen() {
    // Carregar as telas na index
    document.addEventListener("click", async (event) => {
      const opcaoDeTela = event.target.id;
      if (opcaoDeTela && opcaoDeTela !== "text-center" && opcaoDeTela.length > 0 && opcaoDeTela !== "toggle-btn" && opcaoDeTela !== "flexCheckDefault") {
        const preNomePasta = opcaoDeTela.split("_")[0]
        const pasta = this.selectFolder(preNomePasta)
        try {
          const telaASerCarregada = `./assets/html/${pasta}/${opcaoDeTela}.html`;
          const response = await fetch(telaASerCarregada);
          const text = await response.text();
          const textCenter = document.querySelector("#text-center");
          if (textCenter && text) {
            textCenter.innerHTML = text;
          }
          if (opcaoDeTela === "cons_customers") {
            this.loadTableCustomers()
          }

          window.history.pushState({ page: opcaoDeTela }, "", opcaoDeTela);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  selectFolder(pasta) {
    switch (pasta) {
      case "cad":
        return "cadastros";
      case "cons":
        return "consultas";
      default:
        return "";
    }
  }

  loadTableCustomers() {
    if (document.querySelector("#tableCustomers tbody")) {
      import("./consultas/cons_customers.js")
        .then((module) => {
          const CustomerList = module.default;
          const customerList = new CustomerList();
          // Agora você pode usar customerList
          customerList.loadTable()
        })
        .catch((error) => {
          console.error("Erro ao importar o módulo:", error);
        });
    }
  }

  logout() {
    localStorage.removeItem("accessToken");
    window.location.href = "../assets/html/signin.html";
  };

}

const indexLoad = new LoadIndex();
window.logout = () => indexLoad.logout();


