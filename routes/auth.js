// Path: './api/login'
const { Router } = require('express');
const { login } = require('../controllers/auth');
//Para validar mediante middlewares
const { body } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.post('/', [
        body('email', 'El email es obligatorio').isEmail(),
        body('password', 'Password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login

)



module.exports = router;