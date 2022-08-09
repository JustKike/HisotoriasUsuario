const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectID } = require("bson");


const storeSchema = new mongoose.Schema({
    libroId: String,
    titulo: String,
    autor:String,
    cantidad: Number,
    precio: Number,
    descuento: {type: Number, default: 20},
    sucursalId: String,
    usuarioId: String,
    username: String,
    reg_time: {type: Date, default: Date.now},
},{
    'collection': 'Carrito'
},
{timestamps: true},{ runValidators: true, context: 'query' });


var Compras = mongoose.model('Compras', storeSchema);  
module.exports = mongoose.model('Compras',storeSchema);