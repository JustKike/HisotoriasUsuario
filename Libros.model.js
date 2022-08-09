// //declaramos la clase
const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectID } = require("bson");
var uniqueValidator = require('mongoose-unique-validator');
var Sucursal = mongoose.model('Sucursal');

// Definimos atributos del libro
const libroSchema = new mongoose.Schema({
    titulo:{type: String, unique: true, required: [true, "can't be blank"], index: true},
    descripcion: {type: String, unique: true, required: [true, "can't be blank"], index: true},
    paginas: Number,
    autor: String,
    localisacion: {type: Schema.ObjectId, ref: 'Sucursal',autopopulate: true, default: null},
    reg_time: {type: Date, default: Date.now}
},
{
    'collection': 'Repositorio'
},
{timestamps: true},{ runValidators: true, context: 'query' });
libroSchema.plugin(uniqueValidator, {message: 'is already taken.'});
libroSchema.plugin(require('mongoose-autopopulate'));


var Libro = mongoose.model('Libro', libroSchema); 

module.exports = mongoose.model('Libro',libroSchema);