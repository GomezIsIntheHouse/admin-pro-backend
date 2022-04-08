const { response } = require("express");
const Usuario = require("../models/usuario");

const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {



        const usuarioDB = await Usuario.findOne({ email });

        // verificar email
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o contraseña inválido (email invalida)'
            })
        }


        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        //verifico mediante una comparacion, si la contraseña que manda el usuario
        // hace match con la contraseña almacenada en mi BBDD

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña inválido (contraseña invalida)'
            })
        }


        //Generar un token - JWT

        const token = await generarJWT(usuarioDB.id);



        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

module.exports = {
    login
}