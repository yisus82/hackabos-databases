class Transaction {
    constructor(sender, recipient, amount, reference) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
        this.reference = reference;
    }
}

class TransactionBook {
    constructor(bankAccount) {
        this.bankAccount = bankAccount;
        this.transactions = [];
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    calcAmountForAccount(account) {
        return this.transactions.reduce((amount, transaction) => {
            if (transaction.sender && transaction.sender.name === account.name) {
                return amount - transaction.amount;
            } else if (transaction.recipient.name === account.name) {
                return amount + transaction.amount;
            } else {
                return amount;
            }
        }, 0);
    }

    findTransactionsForAccount(account) {        
        return this.transactions.filter(transaction => (transaction.sender && transaction.sender.name === account.name) || transaction.recipient.name === account.name);
    }
}

class Account {
    constructor(name, transactionBook) {
        this.name = name;
        this.transactionBook = transactionBook;
        this.comission = 0;
    }

    receive(amount) {
        const transaction = new Transaction(null, this, amount, Date.now());
        this.transactionBook.addTransaction(transaction);
    }

    send(recipient, amount) {
        const transaction = new Transaction(this, recipient, amount, Date.now());
        this.transactionBook.addTransaction(transaction);
        this.receive(-this.comission);
    }

    get amount() {
        return this.transactionBook.calcAmountForAccount(this);
    }

    get transactions() {
        return this.transactionBook.findTransactionsForAccount(this);
    }
}

class PersonalAccount extends Account {
    constructor(name, transactionBook) {
        super(name, transactionBook);
        this.comission = 0.01;
    }
}

class BussinessAccount extends Account {
    constructor(name, transactionBook) {
        super(name, transactionBook);
        this.comission = 0.02;
    }
}

const transactionBook = new TransactionBook("Bank 1");
const account1 = new PersonalAccount("Account 1", transactionBook);
const account2 = new BussinessAccount("Account 2", transactionBook);
account1.receive(1000);
account2.receive(500);
account1.send(account2, 100);
account2.send(account1, 200);
console.log(account1.transactions);
console.log(account1.amount);
console.log(account2.transactions);
console.log(account2.amount);
