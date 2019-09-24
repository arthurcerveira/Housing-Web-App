class Manager {
  constructor() {
    this.dataBase = new DataBase();
    this.userInterface = new UserInterface();
  }

  createAccount() {
    var account = this.userInterface.getAccountInfo();

    if (account != null) this.dataBase.createAccount(account);
  }

  displayAccounts() {
    this.userInterface.clearUl();

    this.dataBase.accounts.forEach(account => {
      this.userInterface.accountToLi(account);
    });
  }
}

class Account {
  constructor(email, password, name, description, role) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.description = description;
    this.role = role;
  }
}

class DataBase {
  constructor() {
    this.accounts = [];
    this.userInterface = new UserInterface();
  }

  createAccount(account) {
    this.accounts.push(account);
  }
}

class UserInterface {
  constructor() {
    this.accountUl = document.querySelector(".accounts");
  }

  clearUl() {
    this.accountToLi.innerHTML = "";
  }

  accountToLi(account) {
    var accountLi = document.createElement("li");
    var accountDesc = document.createElement("p");
    accountLi.textContent = account.name;
    accountDesc.innerHTML = account.description + ", " + account.role;
    this.accountUl.appendChild(accountLi);
    this.accountUl.appendChild(accountDesc);
  }

  getAccountInfo() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var name = document.getElementById("name");
    var description = document.getElementById("description");
    var role = document.getElementById("role");

    var warning = document.querySelector(".warning");
    // warning.style.margin = 40;

    if (
      email.value == "" ||
      password.value == "" ||
      name.value == "" ||
      description.value == "" ||
      role.value == ""
    ) {
      warning.style.color = "red";
      warning.textContent = "Fields can't be blank!";
      return null;
    } else {
      warning.style.color = "green";
      warning.textContent = "Account created succesfully";
    }

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

manager = new Manager();
