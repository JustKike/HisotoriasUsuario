const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectID } = require("bson");


const ventaSchema = new mongoose.Schema({
    libroId: String,
    titulo: String,
    autor:String,
    cantidad: Number,
    sucursalId: String,
    usuarioId: String,
    reg_time: {type: Date, default: Date.now},
    tipoVenta: {
        type: String,
        enum: ['Venta','Devolucion']        
    }
},{
    'collection': 'Movimientos'
},
{timestamps: true},{ runValidators: true, context: 'query' });


var Ventas = mongoose.model('Ventas', ventaSchema);  
module.exports = mongoose.model('Ventas',ventaSchema);
