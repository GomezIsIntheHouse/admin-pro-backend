require('dotenv').config();

const express = require('express');

const cors = require('cors');

const { dbConection } = require('./database/config');

//crear servidor express
const app = express();

//Configurar CORS
app.use(cors()); // Es una funcion Middleware, con esto nos referimos a que es una funcion que se va a conectar siempre para todas las lineas que siguen hacia abajo

//base de datos
dbConection();



//usuario:  jgomez
//passw:  *k3nU*._6cB4XsW



//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})