class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

const producto1 = new Product('producto1', 10.56);

class Book extends Product {
  constructor(name, price, author) {
    super(name, price);
    this.author = author;
  }
}

class Basket {
  constructor() {
    this.products = [];
  }

  addProduct(product, units) {
    this.products.push(...Array(units).fill(product));
  }

  calcTotal() {
    return this.products
      .map(product => product.price)
      .reduce((a, b) => a + b, 0);
  }

  printShoppingInfo() {
    console.log('one has to pay in total: ' + this.calcTotal());
  }
}

const bread = new Product('Bread', 1);
const water = new Product('Water', 1.5);
const book = new Book('Book1', 10.5, 'Author1');
const basket = new Basket();
basket.addProduct(bread, 2);
basket.addProduct(water, 3);
basket.addProduct(book, 1);
basket.printShoppingInfo();
