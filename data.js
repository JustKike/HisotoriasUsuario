
/* 

SOLO ES UN BORRADOR
consulta:
https://www.bezkoder.com/node-js-mongodb-auth-jwt/

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


 new Sucursal([
                {
                    name: "Sucursal 1",
                    location: { type: "Point", coordinates: [ -73.97, 40.77 ]},
                    category: "Libreria 1"
                }
            ]).save(function(err, res){
                if(err){
                    throw err;
                }else{
                    return res.json({
                        status: true,
                        data: res
                    })
                }
            });

await Sucursal.insertMany([
            {
                name: "Sucursal 1",
                location: { type: "Point", coordinates: [ -73.97, 40.77 ]},
                category: "Libreria 1"
            },
            {
                name: "Sucursal 2",
                location: { type: "Point", coordinates: [ -73.9928, 40.7193 ]},
                category: "Libreria 2"
            },
            {
                name: "Sucursal 3",
                location: { type: "Point", coordinates: [ -73.9375, 40.8303 ]},
                category: "Libreria 3"
            }
        ]);


*/