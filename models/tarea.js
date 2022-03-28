const { v4: uuidV4 } = require('uuid');


class Tarea {

    id = '';
    desc = '';
    completado = null;                  //si es null quiere decir que no esta completada la tarea pero si tiene algo quiere decir que esta completada

    constructor( desc ) {
        this.id = uuidV4();            //genera un id unico 
        this.desc = desc;
        this.completado = null;
    }
}

module.exports = Tarea;







/*
    constructor es un metodo que se ejecuta automaticamente cuando se crea una instancia de la clase

*/