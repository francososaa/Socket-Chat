
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');

const subirArchivo = ( files, extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado [ nombreCortado.length -1 ];

        if( !extensionesValidas.includes( extension )){
            return reject(`La extension ${ extension } no es permitida, las permitidas son: ${ extensionesValidas }`);
        }

        const nombreArchivo = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta,  nombreArchivo );

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            
            resolve( nombreArchivo );
        });
    })

}

module.exports = {
    subirArchivo
};
