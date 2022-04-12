const fs = require('fs-extra');

const res = require('express/lib/response');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

//actualizacion de la libreria fs-extra

const borrarImagen = (path) => {
    if (fs.pathExistsSync(path)) {
        /* Eliminar la imagen anterior */
        fs.removeSync(path);
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);

            if (!medico) {
                console.log('No es un médico por id');

                break;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;

            borrarImagen(pathViejo);


            medico.img = nombreArchivo;
            await medico.save();
            return true;



        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No es un hospital por id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;

            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;



        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;

            borrarImagen(pathViejo);


            usuario.img = nombreArchivo;
            await usuario.save();
            return true;


    }


}



module.exports = {
    actualizarImagen
}