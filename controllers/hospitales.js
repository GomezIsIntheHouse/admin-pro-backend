const { response } = require("express");

const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre email')



    res.json({
        ok: true,
        hospitales
    })

}


const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body,

    });

    try {



        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }


}
const actualizarHospital = async(req, res = response) => {


    try {
        const id = req.params.id;
        const uid = req.uid;

        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            res.status(500).json({
                ok: false,
                msg: 'No se encontró htal por id',

            })
        }




        //actualizar hospital

        hospitalDB.nombre = req.body.nombre;
        const cambiosHospital = {
            ...req.body,
            usuario: uid, //para saber que usuario actualizo el htal

        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true })

        res.json({
            ok: true,
            msg: 'Htal actualizado con exito',
            hospital: hospitalActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adm',

        })
    }


}
const borrarHospital = async(req, res = response) => {

    try {
        const id = req.params.id;


        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            res.status(500).json({
                ok: false,
                msg: 'No se encontró htal por id',

            })
        }

        //eliminar el htal

        await Hospital.findByIdAndDelete(id)

        res.json({
            ok: true,
            msg: 'hospital eliminado'

        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adm',

        })
    }

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}