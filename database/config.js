//configuracion de mongoose

const mongoose = require('mongoose');

//usuario:  jgomez
//passw:  4oIjULFkAcrdHci9

//cadena de conexion a la base de datos
//     mongodb+srv://jgomez:4oIjULFkAcrdHci9@cluster0.jlxw4.mongodb.net/hospitaldb



const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar Base de Datos, ver LOGS');
    }



};

//exporto la funcion para conexion a mi db
module.exports = {
    dbConnection
}