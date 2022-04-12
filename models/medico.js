const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true

    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true

    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

}, { collection: 'medicos' });

//renombrar un atributo de usuario, que dicho nombre del atributo viene por defecto de la base de datos MONGODB
MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    //object.id = _id
    return object;



})

module.exports = model('Medico', MedicoSchema);