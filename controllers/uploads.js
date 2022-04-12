const pathh = require('path'); //viene en node. Sirve para construir un path completo
const fs = require('fs-extra');


const { response } = require("express")
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = async(req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    //validar tipo
    if (!tiposValidos.includes(tipo)) {
        return res.status(404).json({
            ok: false,
            msg: 'Tipo invalido'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    };

    //Procesar imagen

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    //sacamos la extension del archivo.
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extension.
    const extensionValida = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionValida.includes(extensionArchivo.toLowerCase())) {
        return res.status(404).json({
            ok: false,
            msg: 'Tipo de extension invalido'
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;


    //Path para guardar la imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //mover la carpeta

    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        //Actualizar base de datos

        actualizarImagen(tipo, id, nombreArchivo);

        return res.json({
            ok: true,
            msg: 'file Upload',
            nombreArchivo,
            path,
            tipo

        })
    });





}

const retornaImagen = async(req, res) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = pathh.join(__dirname, `../uploads/${tipo}/${foto}`)
    if (fs.pathExistsSync(pathImg)) {
        res.sendFile(pathImg);

    } else {
        const pathImg = pathh.join(__dirname, `../uploads/no-image.jpg`)
        res.sendFile(pathImg);
    }
}

module.exports = {
    fileUpload,
    retornaImagen
}