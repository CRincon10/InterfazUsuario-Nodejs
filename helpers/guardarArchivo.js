const fs = require('fs');

const archivo = 'db/data.json';

const guardarInfoDb = ( data ) => {

    fs.writeFileSync( archivo, JSON.stringify( data ) )

} 


const leerArchivosDb = () => {

    if( !fs.existsSync( archivo ) ){        //si no existe el path o archivo para la ejecucion de la accion
        return null
    }

    const info = fs.readFileSync( archivo, { encoding: 'utf-8' } );
    const data = JSON.parse( info );
    // console.log(data)

    return data
}





module.exports = {
    guardarInfoDb,
    leerArchivosDb,

}


