// Path: './api/login'
const { Router } = require('express');
const { login, googleSingIn, renewToken } = require('../controllers/auth');
//Para validar mediante middlewares
const { body } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.post('/', [
        body('email', 'El email es obligatorio').isEmail(),
        body('password', 'Password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login

);
router.post('/google', [

        body('token', 'El token es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn

)

router.get('/renew', validarJWT, renewToken)



module.exports = router;