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

const anonimo = {
        username: "anonimo",
        nombre: "Prueba",
        apellidos: "Usuario",
        email: "anonimo@mail.com",
        password: "1231234",
        roles: [
            'cliente'
        ]
}



module.exports = {
    usur1
};