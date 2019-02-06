class Teacher {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  iAmTheTeacher() {
    console.log(`I am the teacher: ${this.name}`);
  }

  checkMinAge(age) {
    return age > 12;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (!this.checkMinAge(value)) {
      console.log(`You can't be a teacher if you are only ${value} years old`);
      return;
    }
    this._age = value;
  }
}

const teacher1 = new Teacher('marcos', 44);
console.log(teacher1.age);
teacher1.age = 5;
const teacher2 = new Teacher('pepe', 10);
console.log(teacher2.age);
