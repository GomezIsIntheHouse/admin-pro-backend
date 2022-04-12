const { response } = require("express");

const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {
    //de esta manera traigo todos los medicos cargados en mi base  de datos, y tambien me trae el usuario que cargo/creo el medico
    //y tambien me trae la informacion sobre el hospital en el cual fue cargado

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')


    res.json({
        ok: true,
        medicos
    })


}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;


    const medico = new Medico({
        usuario: uid,
        ...req.body,

    });
    try {



        const medicoDB = await medico.save();

        return res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }











}
const actualizarMedico = (req, res = response) => {

    return res.json({
        ok: true,
        msg: 'actualizarMedico'
    })

}
const borrarMedico = (req, res = response) => {

    return res.json({
        ok: true,
        msg: 'borrarMedicos'
    })

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}