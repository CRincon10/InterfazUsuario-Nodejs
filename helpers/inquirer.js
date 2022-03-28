const inquirer = require('inquirer');
const colors = require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que quieres hacer? '.white,
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear una nueva tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
]


const inquirerMenu = async() => {

    console.clear()

    console.log('===================================='.green);
    console.log('       Seleccione una opción'.white);
    console.log('====================================\n'.green);

    const options = await inquirer.prompt(menuOptions)

    return options.opcion
    
}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${ 'ENTER'.white } para continuar`
        }
    ]

    console.log('\n')           
    await inquirer.prompt(question)
}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate( value ){
                if( value.length < 2){
                    return 'Por favor ingrese una descripción'
                }
                return true;
            }
            
        }
    ];

    const { descripcion } = await inquirer.prompt(question);
    return descripcion;

}


const tareasPorBorrar = async( tareas = [] ) =>{
     
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i+1}.`.green

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }

    });

    choices.unshift({                               // agregar una opción para salir del menu al inicio del array
        value: '0',
        name: `${'0.'.green} Cancelar`
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione la tarea a borrar',
            choices
        }
    ]

    const resp = await inquirer.prompt(preguntas);
    const id = resp.id;
    return id;
}

const confirmacionBorrado = async( message ) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(pregunta);
    return ok;

}


const cambiarEstadoDeTarea = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i+1}.`.green

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completado ) ? true : false                           //cambia el estado de la tarea a completada
        }

    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione la tarea a cambiar de estado',
            choices
        }
    ]

    const resp = await inquirer.prompt(preguntas);
    const ids = resp.ids;
    return ids;


}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    tareasPorBorrar,
    confirmacionBorrado,
    cambiarEstadoDeTarea,
}


