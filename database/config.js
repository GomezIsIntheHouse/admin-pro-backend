//configuracion de mongoose

const mongoose = require('mongoose');

//usuario:  jgomez
//passw:  *k3nU*._6cB4XsW

//cadena de conexion a la base de datos
//     mongodb+srv://jgomez:*****@cluster0.jlxw4.mongodb.net/hospitaldb

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