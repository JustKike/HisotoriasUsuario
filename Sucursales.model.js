// //declaramos la clase
const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectID } = require("bson");
var uniqueValidator = require('mongoose-unique-validator');

// Definimos atributos de Sucursal
const locationSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: [true, "can't be blank"], index: true},
    location:{
        type: {
            type: String,
            enum: ['Point'],
            default: "Point"
        },
        coordinates:{
            type:[Number],
            required: true
        }
    },
    category: String,
    reg_time: {type: Date, default: Date.now}
},
{
    'collection': 'organizacion'
},
{timestamps: true},{ runValidators: true, context: 'query' });
locationSchema.plugin(uniqueValidator, {message: 'is already taken.'});

locationSchema.index( { location: "2dsphere" } );

var Sucursal = mongoose.model('Sucursal', locationSchema);  

module.exports = mongoose.model('Sucursal',locationSchema);