function Profesor(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

const profesor1 = new Profesor('marcos', 42);
console.log(profesor1.nombre);
profesor1.nombre = 'marcos javier';
Profesor.prototype.soyElProfe = function() {
  console.log(`Soy el profesor ${this.nombre}`);
};
profesor1.soyElProfe();

const profesor2 = new Profesor('jesús', 36);
profesor2.soyElProfe();

Profesor.prototype.cumple = function() {
  this.edad++;
};
console.log(profesor2.edad);
profesor2.cumple();
console.log(profesor2.edad);
