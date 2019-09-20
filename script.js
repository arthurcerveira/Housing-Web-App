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
    var accounts = [];
  }

  createAccount(email, password, name, description, role) {
    account = new Account(email, password, name, description, role);
    this.accounts.push(account);
  }
}
