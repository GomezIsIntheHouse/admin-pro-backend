// Path: './api/login'
const { Router } = require('express');
const { login, googleSingIn } = require('../controllers/auth');
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

);
router.post('/google', [

        body('token', 'El token es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn

)



module.exports = router;