//importaciones
var assert = require("chai").assert;
const { expect } = require("chai");
var sinon = require("sinon");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../user.model");
const Role = require('../rol.model');
const Sucursal = require('../Sucursales.model');
require("dotenv").config();
require("../mongo_connection");

//creamos la segunda prueba
describe("Historias de Usuario", function () {

    describe.skip("0 - El administrador podrá crear un sistema de roles de usuario.", function () {
        
            it("Registro de Rol de administrador: ",async function () {
            await Role.create({
                name:"admin"
                });
                var rol1 = await Role.findOne({name:"admin"});
                assert.strictEqual(rol1.name, "admin")
            });
            it("Registro de Rol de almacenista: ",async function () {
            await Role.create({
                name:"almacenista"
                });
                var rol2 = await Role.findOne({name:"almacenista"});
                assert.strictEqual(rol2.name, "almacenista")
            });
            it("Registro de Rol de vendedor: ",async function () {
            await Role.create({
                name:"vendedor"
                });
                var rol3 = await Role.findOne({name:"vendedor"});
                assert.strictEqual(rol3.name, "vendedor")
            });
            it("Registro de Rol de cliente: ",async function () {
            await Role.create({
                name:"cliente"
                });
            var rol4 = await Role.findOne({name:"cliente"});
            assert.strictEqual(rol4.name, "cliente")
        });
    });
    
    describe.skip("1 - Los usuarios que no estén registrados, podrán registrarse para poder acceder.", function () {
        try{  
            it("Registro de nueva cuenta: ",async function () {
                await User.create({
                    username: "Zleyer",
                    nombre: "Joselu",
                    apellidos: "Ubieta",
                    email: "zleyer_viking@mail.com",
                    password: "1231234",
                    roles: [
                        'admin'
                    ]
                });
            });

        }finally{

            it("Nueva cuenta creada: ", async function () {
                let usuario = await User.findOne({username:"jairc"});
                
                let nombreCompleto = function (nombre, email) {
                    return `${nombre} ${email}`;
                };
                assert.strictEqual(nombreCompleto(usuario.nombre,usuario.email),`${usuario.nombre} ${usuario.email}`);
                // console.log(JSON.stringify(usuario,null, ' '));
            });
        }

    });

    describe.skip("2 - Los usuarios podrán autenticarse para poder acceder.", function () {
        
        it("Autenticacion de usuario: ",  async function () {
            const usernm = "jairc";
            const password = "1231234";
            User.findOne({ username: usernm }, function(err, user) {
                if (err) throw err;
                // test a matching password
                user.isCorrectPassword(password, function(err, same) {
                    if (err) throw err;
                    assert.isTrue(same);
                });
            });
        });

        it("Usuario autenticado: ", async function () {
            const usuario = await User.findOne({username:"jairc"});
        let nombreCompleto = function (nombre, email) {
            return `${nombre} ${email}`;
        };
        assert.strictEqual(nombreCompleto(usuario.nombre,usuario.email),`${usuario.nombre} ${usuario.email}`);
        });

        it.skip("Crear token de usuario: ", async function(){
            User.findOne({ username:"jairc" }, function(err, user) {
                if (err) throw err;
                // generar token
                console.log(user._id);
                user.generateJWT()
                user.toAuthJSON({_id: user._id});
                // console.log(token);
            });
        });
        
    });
    describe.skip("3 - El administrador podrá dar de alta y baja usuarios de nivel inferior.", function () {
        const usernm = "jairc";//usuario admin
        it("Alta de usuario: ",async function () {
            const user = await User.findOne({username:usernm})
            try{
                if (user.roles == 'admin'){      
                    await User.create({
                        username: "anonimo",
                        nombre: "Prueba",
                        apellidos: "Usuario",
                        email: "anonimo@mail.com",
                        password: "1231234",
                        roles: ['cliente']
                    });
                    return respuesta = true
                }else{
                    return respuesta = false
                }
            }finally{
                assert.isTrue(respuesta);
            }
        });
        it("Baja de usuarios: ", async function(){
            const user = await User.findOne({username:usernm})
            try{
                if (user.roles == 'admin'){    
                await User.deleteOne({username:'anonimo'});  
                return respuesta = true;
                }else{
                    return respuesta = false;
                }
            }finally{
                assert.isTrue(respuesta);
                // console.log(respuesta);
            }
        });

        it("Modifiacion de usuarios: ", async function(){
            const user = await User.findOne({username:usernm})
            const editar = 'zleyer'
            const rol = 'admin'
            try{
                if (user.roles == 'admin'){    
                await User.updateOne({username:editar},{$set: {roles:rol}});  
                return respuesta = true;
                }else{
                    return respuesta = false;
                }
            }finally{
                const sujeto = await User.findOne({username:editar})
                assert.equal(sujeto.roles,rol);
                // console.log(respuesta);
            }
        });
    });

    describe.skip("4 - El administrador podrá registrar nuevas sucursales.", function () {
        const usernm = "jairc";//usuario admin
        it("Alta de Sucursal: ",async function () {
            const user = await User.findOne({username:usernm})
            try{
                if (user.roles == 'admin'){
                    try{
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
                    }finally{
                        return respuesta = true
                    } 
                }else{
                    return respuesta = false
                }
            }finally{
                assert.isTrue(respuesta);
            }

        });

    });

    describe.skip("5 - El supervisor podrá generar reportes.", function () {});

    describe.skip("6 - Los reportes dispondrán de un sistema de búsqueda y filtrado por parámetros.", function () {});

    describe.skip("7 - Los almacenistas podrán generar libros en el inventario", function () {});

    describe.skip("8 - Los almacenistas podrán dar de baja libros del inventario", function () {});

    describe.skip("9 - Los almacenistas podrán modificar datos de libros en el inventario", function () {});

    describe.skip("10 - El vendedor podrá consultar inventarios, para actualizar el catálogo", function () {});

    describe.skip("11 - El vendedor podrá generar ventas", function () {});

    describe.skip("12 - El vendedor podrá modificar los datos de las ventas", function () {});

    describe.skip("13 - El vendedor podrá dar de baja ventas duplicadas o erróneas", function () {});

    describe.skip("14 - Los clientes podrán generar un perfil de usuario para promociones y descuentos", function () {});

    describe.skip("15 - Los clientes podrán ver su historial de compras en su perfil de usuario", function () {});

    describe.skip("16 - Los clientes podrán visualizar un listado de libros disponibles", function () {});

    describe.skip("17 - Los clientes podrán consultar detalles de libros (autor, fecha de publicación, ubicación, etc.)", function () {});

    describe.skip("18 - Los clientes podrán realizar búsquedas por filtrado de parámetros de los libros", function () {});

    describe.skip("19 - Los clientes podrán realizar compras", function () {});

    describe.skip("11 - El vendedor podrá generar ventas", function () {});

    describe.skip("20 - Los clientes podrán cancelar una compra dentro de la primera media hora", function () {});

});

