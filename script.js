class Account {
  constructor(email, password, name, description, role) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.description = description;
    this.role = role;
  }

  toString() {
    str = this.name + "\n" + this.description + "\n";
  }
}

class DataBase {
  constructor() {
    this.accounts = [];
    this.userInterface = new UserInterface();
  }

  createAccount() {
    var account = this.userInterface.getAccountInfo();
    this.accounts.push(account);
  }

  displayAccounts() {
    this.userInterface.accountUl.innerHTML = "";

    this.accounts.forEach(account => {
      this.userInterface.accountToLi(account);
    });
  }
}

class UserInterface {
  constructor() {
    this.accountUl = document.querySelector(".accounts");
  }

  accountToLi(account) {
    var accountLi = document.createElement("li");
    accountLi.textContent = account.name;
    this.accountUl.appendChild(accountLi);
  }

  getAccountInfo() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var name = document.getElementById("name");
    var description = document.getElementById("description");
    var role = document.getElementById("role");

    var account = new Account(
      email.value,
      password.value,
      name.value,
      description.value,
      role.value
    );

    email.value = "";
    password.value = "";
    name.value = "";
    description.value = "";
    role.value = "";

    return account;
  }
}

dataBase = new DataBase();
