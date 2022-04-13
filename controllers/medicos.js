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
        ...req.body,
        usuario: uid
    });


    try {

        const medicoDB = await medico.save();


        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }



}




const actualizarMedico = async(req, res = response) => {

    try {

        const id = req.params.id;
        const uid = req.uid;

        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            res.status(500).json({
                ok: false,
                msg: 'Medico por id no encontrado'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid, //para saber que usuario actualizo el htal
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true })

        res.json({
            ok: true,
            msg: 'Medico actualizado con exito',
            medicoActualizado
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el adm',

        })

    }

    return res.json({
        ok: true,
        msg: 'actualizarMedico'
    })

}
const borrarMedico = async(req, res = response) => {

    try {
        const id = req.params.id;


        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(500).json({
                ok: false,
                msg: 'Medico por id no encontrado'
            })
        }

        await Medico.findByIdAndDelete(id)


        return res.json({
            ok: true,
            msg: 'medico eliminado',

        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el adm',

        })
    }



}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}