const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSheme = new Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'el email  es requerido']
    },
    password: {
        type: String,
        required: [true, 'el password  es requerido']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: {
            values: ['USER_ROLE'],
            message: '{VALUE} valor no permitido'
        }
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

usuarioSheme.methods.toJSON = function() {
    let usuario = this;
    let usuarioObject = usuario.toObject();
    delete usuarioObject.password;

    return usuarioObject;
}

usuarioSheme.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })

module.exports = mongoose.model('Usuario', usuarioSheme);