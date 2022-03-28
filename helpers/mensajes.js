require('colors');


const mostrarMenu = () => {

    return new Promise((resolve) => {

        console.clear();
    
        console.log('===================================='.green);
        console.log('       Seleccione una opción');
        console.log('====================================\n'.green);
    
        console.log(`${ '1.'.green } Crear una nueva tarea`);
        console.log(`${ '2.'.green } Listar tareas`);
        console.log(`${ '3.'.green } Listar tareas completadas`);
        console.log(`${ '4.'.green } Listar tareas pendientes`);
        console.log(`${ '5.'.green } Completar tarea(s)`);
        console.log(`${ '6.'.green } Borrar tarea`);
        console.log(`${ '0.'.green } Salir`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readline.question('\nSeleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        })
    
    })

}

const pausa = () => {

    return new Promise((resolve) => {
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        
        readline.question(`\nPresione tecla ${'Enter'.green} para continuar...`, (opt) => {
            readline.close()
            resolve(opt);
        })
    })    
}    


module.exports = {
   mostrarMenu,
   pausa
}

















/*Archivo de prueba para verificar que funciona el archivo de mensajes.js

     const readline = require('readline').createInterface({              ==> metodo propio de readline nodejs
        input: process.stdin,
        output: process.stdout
    })


*/