// //declaramos la clase
require('dotenv').config();
const { ObjectID } = require("bson");
const { default: mongoose } = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

// Definimos atributos del perfil de usuario
const profileSchema = new mongoose.Schema({
    userId: String,
    username: {type: String, unique: true, required: [true, "can't be blank"], index: true},
    nombre: {type: String, require: true},
    apellidos: {type: String, require: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true},
    presentacion: {type: String},
    Sexo: [
        {
            type: String,
            enum: ['Hombre','Mujer','Compañere']   
        }
    ],
    fecha_nacimiento: {type: Date, default: Date.now},
    reg_time: {type: Date, default: Date.now}
},
{
    'collection': 'Profiles'
},
{timestamps: true},{ runValidators: true, context: 'query' });
profileSchema.plugin(uniqueValidator, {message: 'is already taken.'});

var Perfil = mongoose.model('Perfil', profileSchema);  

module.exports = mongoose.model('Perfil',profileSchema);