require('dotenv').config();
const { ObjectID } = require("bson");
const { default: mongoose } = require("mongoose");

const usur1 = {
    username: 'jairc',
    nombre: 'Jair',
    apellidos: 'Cervantes',
    email: 'jairc@mail.com',
    password: '1231234',
    roles: [
        'admin',
    ]
}



module.exports = {
    usur1
};