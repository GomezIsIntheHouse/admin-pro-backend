const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario'); //Usuario sin llaves
const res = require('express/lib/response');

const { generarJWT } = require("../helpers/jwt");



const getUsuarios = async(req, res) => {


    const usuarios = await Usuario.find({}, 'nombre email role google ');


    res.json({
        ok: true,
        usuarios,
        uid: req.uid //id del usuario que hizo la peticion del GET USUARIOS
    });


}

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;


    try {

        const existeEmail = await Usuario.findOne({ email })


        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya registrado'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //]Generar token
        const token = await generarJWT(usuario.id); //al generador de token, le paso como argumento el ID de mi usuario.
        //porque debo pasarselo ? porque la funcion asi esta declarada.
        //se puede verificar en jwt.io y comparando con el id del usuario testeado

        //guardar usuario
        await usuario.save();


        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar logs'
        });
    }


};

const actualizarUsuario = async(req, res = response) => {
    //TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            });
        };
        //Actualizaciones
        //traigo todos los campos cargados en el body

        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario registrado con ese email'
                });
            };
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            msg: usuarioActualizado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar'
        })
    }
}

const deleteUsuario = async(req, res = response) => {

    //TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado con el id indicado"
            });
        };

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado con éxito'

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al borrar usuario'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    deleteUsuario

};