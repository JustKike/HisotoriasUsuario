// //declaramos la clase
const { ObjectID } = require("bson");
const { default: mongoose } = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const {Schema} = mongoose.Schema;
//encriptar password
const bcrypt = require("bcrypt");
//repeticiones del algoritmo para encriptar
const saltRounds = 10;
//

// Definimos atributos de usario
const UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    nombre: {type: String, require: true},
    apellidos: {type: String, require: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: {type: String, require: true},
    is_admin: {type: Boolean, default: false}
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

// UserSchema.methods.isCorrectPassword = function(password, callback){
//     bcrypt.compare(password, this.password, function(err, same){
//         if(err){
//             callback(err);
//         }else{
//             callback(err, same);
//         }
//     });
// };

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
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
module.exports = mongoose.model('User',UserSchema);