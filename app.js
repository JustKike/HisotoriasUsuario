// //declaramos la clase
const { ObjectID } = require("bson");
const { default: mongoose } = require("mongoose");
const {Schema} = mongoose;
//encriptar password
const bcrypt = require("bcrypt");
//repeticiones del algoritmo para encriptar
const saltRounds = 10;
//
const service = require("../services");

// Definimos atributos de usario
const UserSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    nombre: {type: String, require: true},
    apellidos: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
});

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

const SchemaPadres = new mongoose.Schema({
    nombre: String,
    hijos:{
        type: ObjectID,
        ref: 'User',
    }
});
//exportamos
module.exports = mongoose.model('User',UserSchema,'Usuarios');