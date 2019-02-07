class Polygon {
    constructor(name, sides) {
        this.name = name;
        this.sides = sides;
    }

    getArea() {
        console.log("Area not defined");
        return NaN;
    }
}

class RegularPolygon extends Polygon {
    constructor(name, sides, sideLength) {
        super(name, sides);
        this.sideLength = sideLength;
    }

    getArea() {
        const perimeter = this.sideLength * this.sides;        
        const apothema = this.sideLength / (2 * Math.tan(Math.PI / this.sides));
        return perimeter * apothema / 2; 
    }
}

class Circle extends Polygon {
    constructor(radius) {
        super("Circle", 0);
        this.radius = radius;
    }

    getArea() {
        return Math.PI * this.radius ** 2;
    }
}

class Triangle extends Polygon {
    constructor(base, height) {
        super("Triangle", 3);
        this.base = base;
        this.height = height;
    }

    getArea() {
        return this.base * this.height / 2;
    }
}

class Rectangle extends Polygon {
    constructor(base, height) {
        super("Rectangle", 4);
        this.base = base;
        this.height = height;
    }

    getArea() {
        return this.base * this.height;
    }
}

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
        this.name = "Square";
        this.side = side;
    }
}

const polygon = new Polygon("Polygon", 7);
console.log(polygon.getArea());

const circle = new Circle(5);
console.log(circle.getArea());

const triangle = new Triangle(2, 3, 4);
console.log(triangle.getArea());

const rectangle = new Rectangle(5, 4);
console.log(rectangle.getArea());

const square = new Square(5);
console.log(square.getArea());

const hexagon = new RegularPolygon("Hexagon", 6, 3);
console.log(hexagon.getArea());
