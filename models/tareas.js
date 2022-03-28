/*
    _listdoData:
                { 'uuid-1234-12341234-12341234: { id:12, desc: asdfasdfalsdflasdf, completado:fecha() } }
*/

const Tarea = require("./tarea");
const colors = require("colors");


class Tareas {

    _listadoData = {};

    get listadoArregloTareas(){             //metodo get es el que me lista las tareas en forma de arreglo este metodo tambien transforma el objeto en un arreglo

        const listadoTareas = [];
        Object.keys(this._listadoData).forEach( key => {        //Metodo de las clases para obtener las llaves de un objeto
            const tarea = this._listadoData[key];               //forEach es un metodo de los arreglos que recorre cada uno de los elementos del arreglo
            listadoTareas.push( tarea );
        });
        return listadoTareas;

    }

    constructor() {
        this._listadoData = {};
    }

    borrarTarea( id ) {
        delete this._listadoData[id];
    }

    cargarTareasDelArreglo ( tareas = [] ){

        tareas.forEach( tarea => {
            this._listadoData[tarea.id] = tarea; 
        });
    }

    crearTarea( desc ) {
            
        const tarea = new Tarea( desc );
        this._listadoData[tarea.id] = tarea;                //de esta forma creo una propiedad dentro del objeto con el id de la tarea y le asigno el objeto tarea
        return tarea;
    }

    listadoCompletoDeTareas () {

        const listadoTareas = this.listadoArregloTareas;

        listadoTareas.forEach( (tarea, i) => {
            
            console.log(`${ colors.green(i)}. ${tarea.desc} :: ${  (tarea.completado) ? colors.green('Completada') : colors.red('Pendiente') }`);
        })   
    }

    listadoTareasCompletasIncompletas ( completada = true ) {

        const listadoTareas = this.listadoArregloTareas;
        let contador = 0;
        
        listadoTareas.forEach( tarea  => {

            
            const { desc, completado } = tarea;
            const estado = ( completado ) ? 'completado'.green : 'pendiente'.red;

            if ( completada ){

                if( completado ){
                    contador += 1;
                    console.log(` ${ (contador + '.').green } ${ desc } :: ${ estado.green }`);
                }

            } else{
                if( !completado ){
                    contador += 1;
                    console.log(` ${ (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            }
            

        } ) 
    }

    toggleCompleted ( ids = [] ){
            
        ids.forEach( id => {
            const tarea = this._listadoData[id];
            if ( !tarea.completado ){
                tarea.completado = new Date().toISOString();
            }
        });

        this.listadoArregloTareas.forEach( tarea => {

            if ( !ids.includes( tarea.id ) ){
                this._listadoData[tarea.id].completado = null
            }
        });

    }

    
    

}


module.exports = Tareas;