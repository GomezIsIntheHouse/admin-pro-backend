//path: '/api/hospitales'




const { Router } = require('express');

const { body } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales')


const router = Router();




router.get('/', [], getHospitales);

router.post('/', [
        validarJWT,
        body('nombre', 'nombre del Hospital Es Necesario').not().isEmpty(),
        validarCampos,
    ],


    crearHospital);

router.put('/:id', [body('nombre', 'nombre del Hospital Es Necesario').not().isEmpty(), ], actualizarHospital);

router.delete('/:id', validarJWT, borrarHospital);






module.exports = router;