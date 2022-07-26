//importaciones
var assert = require("chai").assert;
const { expect } = require("chai");
var sinon = require("sinon");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../app");
require("dotenv").config();
require("../mongo_connection");

//creamos la segunda prueba
describe("Historias de Usuario", function () {
    describe("1 - Los usuarios que no estén registrados, podrán registrarse para poder acceder.", function () {
        // before(async function () {
        //     await User.create({
        //         username: "enrique12",
        //         nombre: "Enrique",
        //         apellidos: "Cervantes",
        //         email: "kike@mail.com",
        //         password: "1231234",
        //     });
        //   });
        it("Debe retornar el usuario creado: ", async function () {
            let usuario = await User.findOne({username:"josel"});
            
            let nombreCompleto = function (nombre, apellidos) {
              return `${nombre} ${apellidos}`;
            };
            assert.strictEqual(nombreCompleto(usuario.nombre,usuario.apellidos),`${usuario.nombre} ${usuario.apellidos}`);
            // console.log(JSON.stringify(usuario,null, ' '));
        });

    });
    describe("2 - Los usuarios podrán autenticarse para poder acceder.", function () {
        it("Autenticacion de usuario: ",  async function () {
            const email = "zleyer@mail.com";
            const password = "1231234";
            let usuario = await User.findOne({email});
            
            let emailContraseña = function (email, contraseña) {
              return `${email} ${contraseña}`;
            };
            assert.strictEqual(emailContraseña(email,usuario.password),`${usuario.email} ${usuario.password}`);
        });
    });
});

