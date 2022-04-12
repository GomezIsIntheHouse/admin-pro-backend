//getTodo

const { response } = require("express")



const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');



const getTodo = async(req, res = response) => {
    //traigo el elemento que deseo buscar, desde el path


    //traer informacion proveida por el parametro del path
    const elementoBusqueda = req.params.busqueda;

    const regExp = new RegExp(elementoBusqueda, 'i');



    const [hospitales, usuarios, medicos] = await Promise.all([

        Hospital.find({ nombre: regExp }),

        Usuario.find({ nombre: regExp }),

        Medico.find({ nombre: regExp }),


    ])

    res.json({
        ok: true,
        hospitales,
        usuarios,
        medicos,
        busqueda: elementoBusqueda


    })






}

const getDocumentosColeccion = async(req, res = response) => {
    //traigo el elemento que deseo buscar, desde el path
    //traer informacion proveida por el parametro del path
    const tabla = req.params.tabla;
    const elementoBusqueda = req.params.busqueda;

    const regExp = new RegExp(elementoBusqueda, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regExp })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');



            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regExp }).populate('usuario', 'nombre img');



            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regExp });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'Tabla debe ser /usuarios/medicos/hospitales'
            })


    }



    res.json({
        ok: true,

        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}