class Account {
  constructor(customer, bank, amount) {
    this.customer = customer;
    this.bank = bank;
    this.amount = amount;
  }

  deposit(amount) {
    this.amount += amount;
  }
}

class Customer {
  constructor(name, accounts) {
    this.name = name;
    this.accounts = accounts;
  }

  subscribe(bank) {
    bank.addSubscriber(this);
  }

  addAcount(account) {
    this.accounts.push(account);
  }

  getTotalAmount() {
    return this.accounts.reduce(
      (accumulator, account) => accumulator + account.amount,
      0
    );
  }

  readAds() {
    console.log(`${this.name} has received ads`);
  }
}

class Bank {
  constructor(name, accounts, customers, subscribers) {
    this.name = name;
    this.accounts = accounts;
    this.customers = customers;
    this.subscribers = subscribers;
  }

  addSubscriber(customer) {
    this.subscribers.push(customer);
  }

  launchAds() {
    this.subscribers.map(subscriber => subscriber.readAds());
  }

  createAccount(customer) {
    const account = new Account(customer, this, 0);
    customer.addAcount(account);
    this.accounts.push(account);
    this.customers.push(customer);
    return account;
  }

  createCustomer(name) {
    const customer = new Customer(name, []);
    this.customers.push(customer);
    return customer;
  }
}

const bank1 = new Bank('Bank 1', [], [], []);
const customer1 = bank1.createCustomer('Customer 1', []);
bank1.createAccount(customer1);
bank1.createAccount(customer1);
customer1.accounts.map(account => account.deposit(100));
const customer2 = bank1.createCustomer('Customer 2', []);
bank1.createAccount(customer2);
customer2.accounts.map(account => account.deposit(300));
customer1.subscribe(bank1);
console.log(customer1.getTotalAmount());
bank1.launchAds();
