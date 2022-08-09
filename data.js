const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require('./user.model');
const Role = require('./rol.model');
const Sucursal = require('./Sucursales.model');
const Libro = require('./Libros.model');
const Ventas = require('./Ventas.model');
const Perfil = require('./Profile.model');
const Compras = require('./Compras.model');

// const { MongoClient } = require("mongodb");

// mongoose.connect('mongodb://127.0.0.1:27017',(err, client) => {
//   var db = client.db('libreria');
//   const catal = db.collection('catalogo');
//   module.exports = catal;
// });


module.exports = async function crearUsuarios() {
    await User.create({
        username: "jairc",
        nombre: "jair",
        apellidos: "Cervantes",
        email: "jairc@mail.com",
        password: "1231234",
        roles: [
            'admin'
        ]
    });
    await User.create({
        username: "jose90",
        nombre: "Jose luis",
        apellidos: "Ubieta",
        email: "jose_luis@mail.com",
        password: "123456",
        roles: [
            'almacenista'
        ]
    });
    await User.create({
        username: "Zleyer",
        nombre: "Joselu",
        apellidos: "Ubieta",
        email: "zleyer_viking@mail.com",
        password: "1231234",
        roles: [
            'almacenista'
        ]
    });
    await User.create({
        username: "zuly90",
        nombre: "Zulay Livier",
        apellidos: "Cervantes",
        email: "livi_z@mail.com",
        password: "123456",
        roles: [
            'almacenista'
        ]
    });
    await User.create({
        username: "mr.robot",
        nombre: "Eliot",
        apellidos: "Alderson",
        email: "mr_robot@mail.com",
        password: "123456",
        roles: [
            'cliente'
        ]
    });
};

module.exports = async function crearSucursal() {
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
};

module.exports = async function crearLibros() {
    //sucursal 1
    await Libro.create({
        titulo: 'Libro 1',
        descripcion: 'Este es el libro 1',
        paginas: 1380,
        autor: 'Eliot Alderson',
        Editorial: 'Penguin Random House',
        localisacion:'62f1bdc8bc6a4f1af92473a8'
    });
    //sucursal 1
    await Libro.create({
        titulo: 'Libro 2',
        descripcion: 'Este es el libro 2',
        paginas: 1380,
        autor: 'Eliot Alderson',
        Editorial: 'Penguin Random House',
        localisacion:'62f1bdc8bc6a4f1af92473a8'
    });
    //sucursal 2 62f1bdc8bc6a4f1af92473a9
    await Libro.create({
        titulo: 'Libro 3',
        descripcion: 'Este ese el libro 3',
        paginas: 1380,
        autor: 'Darlin Alderson',
        Editorial: 'Penguin Random House',
        localisacion:'62f1bdc8bc6a4f1af92473a9'
    });
    //sucursal 2
    await Libro.create({
        titulo: 'Libro 4',
        descripcion: 'Este es el libro 4',
        paginas: 1380,
        autor: 'Darlin Alderson',
        Editorial: 'Penguin Random House',
        localisacion:'62f1bdc8bc6a4f1af92473a9'
    });
    //sucursal 3 62f1bdc8bc6a4f1af92473aa
    await Libro.create({
        titulo: 'Libro 5',
        descripcion: 'Este es el libro 5',
        paginas: 1380,
        autor: 'Tyrel Wellelick',
        Editorial: 'Penguin Random House',
        localisacion:'62f1bdc8bc6a4f1af92473aa'
    });
    //sucursal 3
    await Libro.create({
        titulo: 'Libro 6',
        descripcion: 'Este es el libro 6',
        paginas: 1380,
        autor: 'Tyrel Wellelick',
        Editorial: 'Penguin Random House',
        localisacion:'62f1bdc8bc6a4f1af92473aa'
    });
  
    console.log("Libros generados");
  };

  module.exports = async function crearMovimiento() {
    //tipo de venta  sucursal 1
    await Ventas.create({
        libroId: '62f20f1efdb844efa0aab04b',
        titulo: 'Don Quijote De La Mancha',
        autor:'Miguel de Cervantes',
        cantidad: 10,
        sucursalId: '62f1bdc8bc6a4f1af92473a8',
        usuarioId: '62f236b1a395cdf0fdba3573',
        tipoVenta: 'Venta'
    });
    //Venta sucursal 1
    await Ventas.create({
        libroId: '62f2104a89bd8a1a86af0a66',
        titulo: 'Este es el nuevo titulo',
        autor:'Eliot Alderson',
        cantidad: 20,
        sucursalId: '62f1bdc8bc6a4f1af92473a8',
        usuarioId: '62f236b1a395cdf0fdba3573',
        tipoVenta: 'Venta'
    });
    //venta sucursal 2
    await Ventas.create({
        libroId: '62f2104a89bd8a1a86af0a6c',
        titulo: 'Libro 3',
        autor:'Darlin Alderson',
        cantidad: 8,
        sucursalId: '62f1bdc8bc6a4f1af92473a9',
        usuarioId: '62f236b1a395cdf0fdba3573',
        tipoVenta: 'Venta'
    });
     //venta sucursal 2
     await Ventas.create({
        libroId: '62f2104a89bd8a1a86af0a72',
        titulo: 'Libro 4',
        autor:'Darlin Alderson',
        cantidad: 12,
        sucursalId: '62f1bdc8bc6a4f1af92473a9',
        usuarioId: '62f236b1a395cdf0fdba3573',
        tipoVenta: 'Venta'
    });
    //venta sucursal 3
    await Ventas.create({
        libroId: '62f2104a89bd8a1a86af0a78',
        titulo: 'Libro 5',
        autor:'Tyrel Wellelick',
        cantidad: 5,
        sucursalId: '62f1bdc8bc6a4f1af92473aa',
        usuarioId: '62f236b1a395cdf0fdba3573',
        tipoVenta: 'Venta'
    });
    //Devolucion sucursal 3
    await Ventas.create({
        libroId: '62f2104a89bd8a1a86af0a78',
        titulo: 'Libro 5',
        autor:'Tyrel Wellelick',
        cantidad: 2,
        sucursalId: '62f1bdc8bc6a4f1af92473aa',
        usuarioId: '62f236b1a395cdf0fdba3573',
        tipoVenta: 'Devolucion'
    });
    //venta sucursal 3
    await Ventas.create({
        libroId: '62f2104a89bd8a1a86af0a7e',
        titulo: 'Libro 6',
        autor:'Tyrel Wellelick',
        cantidad: 2,
        sucursalId: '62f1bdc8bc6a4f1af92473aa',
        usuarioId: '62f236b1a395cdf0fdba3573',
        tipoVenta: 'Venta'
    });
  };

  module.exports = async function agregarCarrito() {
      await Compras.create({
        libroId: '62f2104a89bd8a1a86af0a6c',
        titulo: 'Libro 3',
        autor: 'Darlin Alderson',
        cantidad: 2,
        precio: 500,
        sucursalId: '62f1bdc8bc6a4f1af92473a9',
        usuarioId: '62f180f608f7e48ed7120e49',
        username:'jazzprincess'
      });
      await Compras.create({
        libroId: '62f2104a89bd8a1a86af0a78',
        titulo: 'Libro 5',
        autor: 'Tyrel Wellelick',
        cantidad: 1,
        precio: 350,
        sucursalId: '62f1bdc8bc6a4f1af92473aa',
        usuarioId: '62f180f608f7e48ed7120e49',
        username:'jazzprincess'
      });
  };
  



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


> db.users.insert([{"name": "Mauricio", "email": "mauricio@email.com"},{"name": "Patricio", "email": "patricio@email.com"}])
> db.users.find({})
{ "_id" : ObjectId("5c9ccc140aee604c4ab6cd06"), "name" : "Mauricio", "email" : "mauricio@email.com" }
{ "_id" : ObjectId("5c9ccc140aee604c4ab6cd07"), "name" : "Patricio", "email" : "patricio@email.com" }

https://es.stackoverflow.com/questions/249344/relaciones-entre-collections-mongo

*/