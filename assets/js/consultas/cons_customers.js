export default class CustomerList {
  constructor() {
    this.baseURL = "http://localhost:3000";
    this.accessToken = localStorage.getItem("accessToken");

    this.apiConnection = axios.create({
      baseURL: this.baseURL, // Definindo a URL base
      headers: {
        'Authorization': `Bearer ${this.accessToken}`  // Configurando o header Authorization
      }
    });

  }

  async loadTable() {
    try {
      const response = await this.apiConnection.get(`/customers`);
      const customersList = response.data

      const bodyTable = document.querySelector("#tableCustomers tbody");
      if (!bodyTable) {
        console.error("Elemento #tableCustomers não encontrado.");
        return;
      }

      const titleTable = document.querySelector("#tableCustomers thead");
      const headline =
      `<tr>
        <th>Codigo</th>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Telefone</th>
        <th>Status</th>
        <th>Ações</th>
      </tr>`

      
      titleTable.innerHTML = headline
      

      bodyTable.innerHTML = '';

      customersList.forEach((customer) => {
        const newTableLine = `<tr>
        <td>${customer.id}</td>
        <td id='td_name'>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.telephone}</td>
        <td>${customer.status === 1 ? "ativo" : "inativo"}</td>
        <td><a class="btn btn-primary btn-sm" href="">Editar</a> | Excluir</td>
      </tr>`;
        bodyTable.innerHTML += newTableLine
      });
    } catch (e) {
      console.error(e);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const customerList = new CustomerList();
  customerList.loadTable();
});
