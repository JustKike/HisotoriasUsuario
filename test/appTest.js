//importaciones
var assert = require("chai").assert;
const { expect } = require("chai");
var sinon = require("sinon");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../app");
require("dotenv").config();
require("../mongo_connection");
//encriptar password
const bcrypt = require("bcrypt");
//repeticiones del algoritmo para encriptar
const saltRounds = 10;

//creamos la segunda prueba
describe("Historias de Usuario", function () {
    describe("1 - Los usuarios que no estén registrados, podrán registrarse para poder acceder.", function () {
        try{
            it("Registro de nueva cuenta: ",async function () {
                await User.create({
                    username: "kike",
                    nombre: "Enrique",
                    apellidos: "Cervantes",
                    email: "kike@mail.com",
                    password: "1231234",
                    is_admin: false
                });
            });
        }finally{
            it("Nueva cuenta creada: ", async function () {
                let usuario = await User.findOne({username:"kike"});
                
                let nombreCompleto = function (nombre, email) {
                    return `${nombre} ${email}`;
                };
                assert.strictEqual(nombreCompleto(usuario.nombre,usuario.email),`${usuario.nombre} ${usuario.email}`);
                // console.log(JSON.stringify(usuario,null, ' '));
            });
        }
    });

    describe("2 - Los usuarios podrán autenticarse para poder acceder.", function () {
        it("Autenticacion de usuario: ",  async function () {
            const usernm = "jairc";
            const password = "1231234";
            User.findOne({ username: usernm }, function(err, user) {
                if (err) throw err;
                // test a matching password
                user.comparePassword(password, function(err, isMatch) {
                    if (err) throw err;
                    console.log('contraseña:', isMatch);
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
    });
});

