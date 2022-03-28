require('colors');

const { 
    inquirerMenu, 
    pausa, 
    leerInput,
    tareasPorBorrar,
    confirmacionBorrado,
    cambiarEstadoDeTarea, 
    
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');
const Tarea = require('./models/tarea');
const { guardarInfoDb, leerArchivosDb } = require('./helpers/guardarArchivo');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDeDb = await leerArchivosDb();

    if ( tareasDeDb ){
        tareas.cargarTareasDelArreglo( tareasDeDb );
    }

    do{
        opt = await inquirerMenu();
        
        switch(opt){
            case '1': //crear nueva tarea
                const desc = await leerInput('Ingrese la descripción de la tarea:');
                const tarea = tareas.crearTarea(desc)
                console.log(`Tarea creada: ${tarea.desc}`);
            break;
            case '2': //listar tareas
                tareas.listadoCompletoDeTareas()

            break;
            case '3': //listar tareas completadas
                tareas.listadoTareasCompletasIncompletas(true)  
            break;
            case '4': //listar tareas pendientes
                tareas.listadoTareasCompletasIncompletas(null)
            break;
            case '5': //completar tarea
                const ids = await cambiarEstadoDeTarea(tareas.listadoArregloTareas);
                tareas.toggleCompleted(ids);
            break;
            case '6': //borrar tarea
                const id = await tareasPorBorrar( tareas.listadoArregloTareas );
                if ( id !== '0' ){
                    const eliminarSiONo = await confirmacionBorrado('¿Estas seguro?');
                    
                    if ( eliminarSiONo ){
                        tareas.borrarTarea(id);
                        console.log(`Tarea ${ id } eliminada`);
                    }
                }


            break;
            case '0': //salir

            break;


        }

        guardarInfoDb(tareas.listadoArregloTareas)           // Guardar en el archivo data.json
        
       

        await pausa()
        

    }while(
        opt !== '0'
    );

   

}

main();
