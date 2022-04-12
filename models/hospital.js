const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true

    },
    img: {
        type: String
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'hospitales' });

//renombrar un atributo de usuario, que dicho nombre del atributo viene por defecto de la base de datos MONGODB
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    //object.id = _id
    return object;



})

module.exports = model('Hospital', HospitalSchema);