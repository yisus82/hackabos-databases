class Transaction {
  constructor(sender, receiver, amount, reference) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.reference = reference;
  }
}

class Account {
  constructor(ledger, name) {
    this.ledger = ledger;
    this.name = name;
  }

  send(receiver, amount, reference) {
    this.ledger.addTransaction(
      new Transaction(this, receiver, amount, reference)
    );
    this.ledger.addTransaction(
      new Transaction(this, this.ledger.bankAccount, 0.01, 'Transaction Fee')
    );
  }

  get amount() {
    return this.ledger.calculateAmountForAccount(this);
  }

  get transactions() {
    return this.ledger.findTransactionsForAccount(this);
  }

  toString() {
    return `${this.name} ${this.amount}`;
  }
}

class BusinessAccount extends Account {
  send(receiver, amount, reference) {
    this.ledger.addTransaction(
      new Transaction(this, receiver, amount, reference)
    );
    this.ledger.addTransaction(
      new Transaction(this, this.ledger.bankAccount, 0.02, 'Transaction Fee')
    );
  }
}

class Ledger {
  constructor() {
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  calculateAmountForAccount(account) {
    return this.transactions.reduce((amount, transaction) => {
      if (transaction.sender === account) {
        return amount - transaction.amount;
      }

      if (transaction.receiver === account) {
        return amount + transaction.amount;
      }
      return amount;
    }, 0);
  }

  findTransactionsForAccount(account) {
    return this.transactions.filter(transaction => {
      if (transaction.sender === account || transaction.receiver === account) {
        return true;
      }
      return false;
    });
  }
}

const ledger1 = new Ledger();

// setup bank account and wire to to the ledger (for transaction fees)
const bankAccount = new Account(ledger1, 'Deutsche Bank');
ledger1.addTransaction(
  new Transaction(null, bankAccount, 1000000, 'Initial Amount')
);
ledger1.bankAccount = bankAccount;

// setup private account
const privateAccount = new Account(ledger1, 'Sebastian Deutsch');
ledger1.addTransaction(
  new Transaction(null, privateAccount, 100, 'Initial Amount')
);

// setup private account
const anotherPrivateAccount = new Account(ledger1, 'Mathias Schäfer');
ledger1.addTransaction(
  new Transaction(null, anotherPrivateAccount, 100, 'Initial Amount')
);

// setup company account
const companyAccount = new BusinessAccount(ledger1, '9elements GmbH');
ledger1.addTransaction(
  new Transaction(null, companyAccount, 1000, 'Initial Amount')
);
