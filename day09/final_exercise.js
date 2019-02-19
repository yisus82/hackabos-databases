const getRandomPosition = arr => Math.floor(Math.random() * arr.length);
const getRandomElement = arr => arr[getRandomPosition(arr)];
const removeElement = (sectorArmyName, sectorArray) =>
  sectorArray.map(sector => {
    if (sector == null) {
      return null;
    } else if (sector.army.name === sectorArmyName) {
      return null;
    } else {
      return sector;
    }
  });
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

class Ship {
  constructor(damagePoints, shieldPoints, codeName) {
    this.damagePoints = damagePoints;
    this.shieldPoints = shieldPoints;
    this.codeName = codeName;
  }

  isActive() {
    return this.shieldPoints > 0;
  }

  selectTarget(target) {
    this._target = target;
  }

  takeDamage(damage) {
    this.shieldPoints -= damage;
  }

  shoot(target) {
    this.selectTarget(target);
    if (target) {
      console.log(`${this.codeName} shot ${target.codeName}`);
      target.takeDamage(this.damagePoints);
      if (!target.isActive()) {
        console.log(`${target.codeName} destroyed!`);
      }
    } else {
      console.log(`${this.codeName} missed the shot`);
    }
  }
}

class ShipOne extends Ship {
  constructor(codeName) {
    super(10, 5, codeName);
  }
}

class ShipTwo extends Ship {
  constructor(codeName) {
    super(5, 10, codeName);
  }
}

class ShipThree extends Ship {
  constructor(codeName) {
    super(8, 7, codeName);
  }
}

const SHIP_TYPES = [ShipOne, ShipTwo, ShipThree];

class Army {
  constructor(name, ships) {
    this.name = name;
    this.ships = ships;
  }

  getRandomShip() {
    return getRandomElement(this.ships);
  }

  getShipStatusReport() {
    return this.ships.map(ship => ({
      codeName: ship.codeName,
      active: ship.isActive()
    }));
  }

  isDefeated() {
    return this.getShipStatusReport().filter(ship => ship.active).length === 0;
  }
}

class Sector {
  constructor(army, rows, columns) {
    this.army = army;
    this.rows = rows;
    this.columns = columns;
    this.positions = this.initPositions(rows, columns);
  }

  initPositions(rows, columns) {
    return [...Array(rows)].map(() => new Array(columns).fill(null));
  }

  getElementAt(row, col) {
    return this.positions[row][col];
  }

  addElement(element) {
    let row = getRandomPosition(this.positions);
    let column = getRandomPosition(this.positions[row]);
    while (this.getElementAt(row, column)) {
      row = getRandomPosition(this.positions);
      column = getRandomPosition(this.positions[row]);
    }
    this.positions[row][column] = element;
  }
}

class Battlefield {
  constructor(armySectors) {
    this.armySectors = armySectors;
    this.turn = Math.floor(Math.random() * this.armySectors.length);
  }

  switchTurn() {
    this.turn = (this.turn + 1) % this.armySectors.length;
    if (!this.armySectors[this.turn]) {
      this.switchTurn();
    }
  }

  executeTurn() {
    const armySector = this.armySectors[this.turn];
    const ship = armySector.army.getRandomShip();
    let targetArmySector = getRandomElement(this.armySectors);
    while (!targetArmySector || targetArmySector === armySector) {
      targetArmySector = getRandomElement(this.armySectors);
    }
    const target = getRandomElement(
      getRandomElement(targetArmySector.positions)
    );
    ship.shoot(target);
    const targetArmy = targetArmySector.army;
    if (targetArmy.isDefeated()) {
      console.log(`${targetArmy.name} defeated`);
      this.armySectors = removeElement(targetArmy.name, this.armySectors);
      const survivors = this.armySectors.filter(value => value);
      if (survivors.length === 1) {
        return survivors[0].army.name;
      }
      return null;
    }
    return null;
  }

  playGame() {
    let winner = this.executeTurn();
    while (!winner) {
      this.switchTurn();
      winner = this.executeTurn();
    }
    return winner;
  }
}

class Generator {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
  }

  createArmy(name, shipCountArr) {
    const ships = [];
    for (let i = 0; i < shipCountArr.length; i++) {
      for (let j = 0; j < shipCountArr[i]; j++) {
        ships.push(
          new SHIP_TYPES[i](`${name} - ${SHIP_TYPES[i].name} #${j + 1}`)
        );
      }
    }
    return new Army(name, ships);
  }

  placeShips(army) {
    const sector = new Sector(army, this.rows, this.columns);
    army.ships.forEach(ship => sector.addElement(ship));
    return sector;
  }

  createBattlefield(armies) {
    const armySectors = armies.map(army => this.placeShips(army));
    return new Battlefield(armySectors);
  }
}

const generator = new Generator(getRandomInt(5, 10), getRandomInt(5, 10));
const armiesCount = getRandomInt(2, 10);
const myArmies = [];
for (let i = 0; i < armiesCount; i++) {
  const shipCount = [];
  for (let j = 0; j < SHIP_TYPES.length; j++) {
    shipCount.push(
      getRandomInt(
        1,
        Math.floor((generator.rows * generator.columns) / SHIP_TYPES.length)
      )
    );
  }
  myArmies.push(generator.createArmy(`Army #${i + 1}`, shipCount));
}
const battlefield = generator.createBattlefield(myArmies);
console.log(
  `The battlefield has ${generator.rows} rows and ${generator.columns} columns`
);

console.log(`There are ${myArmies.length} armies in the battlefield`);
console.log(`And the winner is...${battlefield.playGame()}`);
