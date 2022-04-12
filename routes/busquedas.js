/* 
    path:api/todo/ :nombre de la busqueda
*/

const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas')



//ruta
router.get('/:busqueda', [validarJWT, ], getTodo);
router.get('/coleccion/:tabla/:busqueda', [validarJWT, ], getDocumentosColeccion);


module.exports = router;