//importaciones
var assert = require("chai").assert;
const { expect } = require("chai");
var sinon = require("sinon");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../user.model");
const Role = require('../rol.model');
const usur1 = require('../data')
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

});

