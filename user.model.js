// //declaramos la clase
require('dotenv').config();
require('./rol.model')
const { ObjectID } = require("bson");
const { default: mongoose } = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const secret = require('./services').secret;
var Schema = mongoose.Schema;
var Role = mongoose.model('Role');
// const Role = require("../rol.model");
//encriptar password
const bcrypt = require("bcrypt");
//repeticiones del algoritmo para encriptar
const saltRounds = 10;

// Definimos atributos de usario
const UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    nombre: {type: String, require: true},
    apellidos: {type: String, require: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: {type: String, require: true},
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            type: mongoose.Schema.Types.String,
            ref: 'Role',
            required: 'Rol is required'
        }
    ],
    token: {type: String,default: null},
    reg_time: {type: Date, default: Date.now}
},
{
    'collection': 'Usuarios'
},
{timestamps: true},{ runValidators: true, context: 'query' });
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err,hashedPassword) => {
            if(err){
                next(err);
            }else{
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
});

UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    });
};

UserSchema.methods.generateJWT = function() {
      var today = new Date();
      var exp = new Date(today);
      exp.setDate(today.getDate() + 60);
    
      return token = jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
      }, process.env.TOKEN_SECRET);
    };

UserSchema.methods.toAuthJSON = function(){
        return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        is_admin: this.is_admin,
        };
    };


// const SchemaPadres = new mongoose.Schema({
//     nombre: String,
//     hijos:{
//         type: ObjectID,
//         ref: 'User',
//     }
// });
//exportamos

var User = mongoose.model('User', UserSchema);  

// module.exports = {
//     schema: UserSchema,
//     model: User
// };

module.exports = mongoose.model('User',UserSchema);
