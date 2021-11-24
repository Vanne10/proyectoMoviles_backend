/*
Path: api/login
*/

const { Router, response } = require('express');
const { crearUsuario } = require('../controllers/auth')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//End point para crear un usuario
router.post('/new', [
    //express-validator para hacer validaciones
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], crearUsuario)

module.exports = router
