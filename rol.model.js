// //declaramos la clase
require('dotenv').config();
const { ObjectID } = require("bson");
const { default: mongoose } = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

//creamos un schema para los roles
var roleSchema = new Schema({
    name: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    },
{
    'collection': 'Roles'
},
{timestamps: true},{ runValidators: true, context: 'query' });
roleSchema.plugin(uniqueValidator, {message: 'is already exist.'});


var Role = mongoose.model('Role', roleSchema);  

// module.exports = {
//     schema: roleSchema,
//     model: Role
// };

module.exports = mongoose.model('Role',roleSchema);