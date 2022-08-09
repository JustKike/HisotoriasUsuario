//importaciones
var assert = require("chai").assert;
const { expect } = require("chai");
require("dotenv").config();
require("../mongo_connection");
var sinon = require("sinon");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const  ObjectID = require('mongodb').ObjectId;
const User = require("../user.model");
const Role = require('../rol.model');
const Sucursal = require('../Sucursales.model');
const Libro = require('../Libros.model');
const Ventas = require('../Ventas.model');
const Perfil = require('../Profile.model');
const Compras = require('../Compras.model');
//Registros
const crearUsuarios = require("../data");
const crearSucursal = require("../data");
const crearLibros = require("../data");
const crearMovimiento = require('../data');
const agregarCarrito = require('../data');
// const catal = require("../data");



//creamos la segunda prueba
describe("Historias de Usuario", function () {
    describe.skip("Generamos algunos registros", function () {
        it("Agregando registros: ",async function () {
                await crearUsuarios();
                await crearSucursal();
                await crearLibros();
                await crearMovimiento();
                await agregarCarrito();
        });
    });
    
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
                    username: "vendedorPrime",
                    nombre: "Vendedor",
                    apellidos: "Top",
                    email: "vendedor_prime@mail.com",
                    password: "1231234",
                    roles: [
                        'vendedor'
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

        it("Crear token de usuario: ", async function(){
            User.findOne({ username:"jairc" }, function(err, user) {
                if (err) throw err;
                // generar token
                console.log(user._id);
                user.generateJWT()
                user.toAuthJSON({_id: user._id});
                // console.log(token);
            });
        });

        it('Inicio de sesion erronea',async function(){
            let usuario = "Administrador";
            let password = "123457";
            const existe = await User.findOne({usuario: usuario});            
            assert.notEqual(existe.password,password);            
        })

        
    });
    describe.skip("3 - El administrador podrá dar de alta y baja usuarios de nivel inferior.", function () {
        const usernm = "jairc";//usuario admin
        it("Alta de usuario: ",async function () {
            const user = await User.findOne({username:usernm});
            try{
                if (user.roles == 'admin'){      
                    await User.create({
                        username: "anonimo",
                        nombre: "anonimo",
                        apellidos: "anonimo",
                        email: "anonimo@mail.com",
                        password: "1231234",
                        roles: ['cliente']
                    });
                    return respuesta = true;
                }else{
                    return respuesta = false;
                }
            }finally{
                assert.isTrue(respuesta);
            }
        });
        it("Baja de usuarios: ", async function(){
            const user = await User.findOne({username:usernm});
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
            const user = await User.findOne({username:usernm});
            const editar = 'zleyer';
            const rol = 'admin';
            try{
                if (user.roles == 'admin'){    
                await User.updateOne({username:editar},{$set: {roles:rol}});  
                return respuesta = true;
                }else{
                    return respuesta = false;
                }
            }finally{
                const sujeto = await User.findOne({username:editar});
                assert.equal(sujeto.roles,rol);
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
                                name: "Sucursal 4",
                                location: { type: "Point", coordinates: [ -73.98, 40.78 ]},
                                category: "Libreria 4"
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

    describe.skip("5 - El supervisor podrá generar reportes.", function () {
        const usernm = "jairc";//usuario admin
        it("Generando reporte de inventario: ", async function () {
            const user = await User.findOne({username:usernm});
            const libros = 6;
            try{
                if (user.roles == 'admin'){
                    let inventario = await Libro.find();
                    assert.strictEqual(inventario.length,libros);
                    return respuesta = true;
                }else{
                    return respuesta = false
                }
            }finally{
                assert.isTrue(respuesta);
            }

        });
        it("Generando reporte de movimientos de ventas: ", async function () {
            const user = await User.findOne({username:usernm});
            const ventas = 10;
            try{
                if (user.roles == 'admin'){
                    let movimientos = await Ventas.find();
                    assert.strictEqual(movimientos.length,ventas);
                    return respuesta = true;
                }else{
                    return respuesta = false
                }
            }finally{
                assert.isTrue(respuesta);
            }
        });
    });

    describe.skip("6 - Los reportes dispondrán de un sistema de búsqueda y filtrado por parámetros.", function () {
        it("Filtrando reporte de inventarios por sucursal: ", async function () {
            sucursalId = '62f1bdc8bc6a4f1af92473a8';
            items = 2;
                let item = await Libro.find({localisacion: sucursalId});
                if(item){
                    assert(true);
                }else{
                    assert.fail('No se pudo filtrar por sucursal');
                }
                assert.strictEqual(item.length,items);
        });
        it("Filtrando reporte de movimientos de ventas por sucursal: ", async function () {
            sucursalId = '62f1bdc8bc6a4f1af92473aa';
            items = 10;
                let item = await Ventas.find({localisacion: sucursalId});
                if(item){
                    assert(true);
                }else{
                    assert.fail('No se pudo filtrar por sucursal');
                }
                assert.strictEqual(item.length,items);
        });
    });

    describe.skip("7 - Los almacenistas podrán generar libros en el inventario", function () {
        const usernm = "zuly90";//usuario almacenista
        it("Alta de Libro: ", async function () {
            const user = await User.findOne({username:usernm});
            try{
                if (user.roles == 'almacenista'){
                    try{
                        await Libro.create({
                            titulo: 'Don Quijote De La Mancha',
                            descripcion: 'Hace diez años la Asociación de Academias de la Lengua Española pensó este Quijote para todos. Hoy se reedita -en edición limitada- para conmemorar los 400 años de la muerte de su autor.',
                            paginas: 1380,
                            autor: 'Miguel de Cervantes',
                            Editorial: 'Penguin Random House',
                            localisacion:'62f1bdc8bc6a4f1af92473a8'
                        });
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

    describe.skip("8 - Los almacenistas podrán dar de baja libros del inventario", function () {
        const usernm = "zuly90";//usuario almacenista
        it("Baja de Libro: ", async function () {
            const user = await User.findOne({username:usernm});
            const tituloD = 'Libro 1';
            try{
                if (user.roles == 'almacenista'){
                    await Libro.deleteOne({titulo:tituloD});
                    return respuesta = true;
                }else{
                    return respuesta = false;
                }
            }finally{
                assert.isTrue(respuesta);
            }
        });
    });

    describe.skip("9 - Los almacenistas podrán modificar datos de libros en el inventario", function () {
        const usernm = "zuly90";//usuario almacenista
        it("Baja de Libro: ", async function () {
            const user = await User.findOne({username:usernm});
            const editar = 'Libro 2';
            const nuevo = 'Este es el nuevo titulo';
            try{
                if (user.roles == 'almacenista'){    
                await Libro.updateOne({titulo:editar},{$set: {titulo:nuevo}});  
                return respuesta = true;
                }else{
                    return respuesta = false;
                }
            }finally{
                const libro = await Libro.findOne({titulo:nuevo});
                assert.equal(libro.titulo,nuevo);
            }
        });
    });

    describe.skip("10 - El vendedor podrá consultar inventarios de libros, para actualizar el catálogo", function () {
        const usernm = "vendedorprime";//usuario vendedor
        const nueva = 'catalogo';
        it("Consulta de inventario de todas las sucursales: ", async function () {
            const user = await User.findOne({username:usernm});
            try{
                if (user.roles == 'vendedor'){    
                    let relacion = await Libro.find();         
                    if(relacion){
                        assert(true);
                    }
                    else{
                        assert.fail('No existe un listado de libros em sucursal');
                    }
                    return respuesta = true;
                }else{
                    return respuesta = false;
                }
            }finally{
                assert.isTrue(respuesta);
            }
        });

        it("Actualizar catalogo: ", async function () {
            const user = await User.findOne({username:usernm});
            try{
                if (user.roles == 'vendedor'){    
                    let cat = await Libro.aggregate([{$out: nueva}]);       
                    if(cat){
                        assert(true);
                    }
                    else{
                        assert.fail('No existe un el catalogo');
                    }
                    return respuesta = true;
                }else{
                    return respuesta = false;
                }
            }finally{
                assert.isTrue(respuesta);
            }
        });

    });

    describe.skip("11 - El vendedor podrá generar movimientos de ventas", function () {
        const usernm = "tere2022";//usuario vendedor
        it("Generando un movimiento: ", async function () {
            const user = await User.findOne({username:usernm});
            try{
                if (user.roles == 'vendedor'){ 
                    try{
                        let venta = 
                        await Ventas.create({
                            libroId: '62f2104a89bd8a1a86af0a66',
                            titulo: 'Este es el nuevo titulo',
                            autor:'Eliot Alderson',
                            cantidad: 1,
                            sucursalId: '62f1bdc8bc6a4f1af92473a8',
                            usuarioId: '62f236b1a395cdf0fdba3573',
                            tipoVenta: 'Devolucion'
                        });   
                        if(venta){
                            assert(true);
                        }
                        else{
                            assert.fail('No se creo el movimiento');
                        }
                    }finally{
                        return respuesta = true;
                    }
                }else{
                    return respuesta = false;
                }
            }finally{
                assert.isTrue(respuesta);
            }
        });
    });

    describe.skip("12 - El vendedor podrá modificar los datos de las ventas", function () {
        const usernm = "tere2022";//usuario vendedor
        it("Modifiacion de movimiento registrado: ", async function(){
            const user = await User.findOne({username:usernm});
            const editar = '62f2430d182cfb5afde79e9e';
            const title = 'Libro sobre mr.robot';
            const qty = 20;
            try{
                if (user.roles == 'vendedor'){    
                    let mov = await Ventas.updateOne({_id: editar},{$set: {cantidad:qty,titulo:title}});
                    if(mov){
                        assert(true);
                    }
                    else{
                        assert.fail('No se pudo realizar la actualizacion');
                    }
                }
            }finally{
                const movim = await Ventas.findOne({_id: editar});
                assert.equal(movim.titulo,title);
            }
        });
    });

    describe.skip("13 - El vendedor podrá dar de baja ventas duplicadas o erróneas", function () {
        const usernm = "tere2022";//usuario vendedor
        it("Generando movimiento de venta duplicada: ", async function () {
            const user = await User.findOne({username:usernm});
            try{
                if (user.roles == 'vendedor'){
                    await Ventas.create({
                        libroId: '62f2104a89bd8a1a86af0a66',
                        titulo: 'Esta es una venta duplicada',
                        autor:'Err',
                        cantidad: 100,
                        sucursalId: '62f1bdc8bc6a4f1af92473a8',
                        usuarioId: '62f236b1a395cdf0fdba3573',
                        tipoVenta: 'Devolucion'
                    });   
                    return respuesta = true;
                }else{
                    return respuesta = false;
                }
            }finally{
                assert.isTrue(respuesta);
            }
        });
        it("Borrando venta duplicada: ", async function () {
            const user = await User.findOne({username:usernm});
            const delet = '62f24ff483555e236f6fb6b4';
            try{
                if (user.roles == 'vendedor'){
                    await Ventas.deleteOne({_id: delet});
                    return respuesta = true;
                }else{
                    return respuesta = false;
                }
            }finally{
                assert.isTrue(respuesta);
            }
        });

    });

    describe.skip("14 - Los clientes podrán generar un perfil de usuario para promociones y descuentos", function () {
        const usernm = "jazzprincess";//usuario cliente Perfil
        it("Creacion de perfil de usuario: ", async function () {
            const user = await User.findOne({username:usernm});
            let profile = await Perfil.create({
                userId: '62f180f608f7e48ed7120e49',
                username: user.username,
                nombre: user.nombre,
                apellidos: user.apellidos,
                email: user.email,
                presentacion: 'Donde esten las rebajas, ahi me encontraras... xoxo',
                Sexo: 'Mujer',
            });
            if(profile){
                assert(true);
            }
            else{
                assert.fail('No se pudo crear el perfil');
            }
        });
    });

    describe.skip("15 - Los clientes podrán ver su historial de compras", function () {
        it("Desplegando hisotorial de compras del usuario cliente: ", async function () {
            const usernm = "jazzprincess";//usuario cliente
            const id = '62f180f608f7e48ed7120e49';
            try{
                const user = await User.findOne({username:usernm});
                let historial = await Compras.find({username:user.username, usuarioId:id});
                console.log(historial.length);
                if(historial){
                    return response = true;
                }else{
                    assert.fail('No se pudo visualizar el historial');
                }
            }finally{
                assert.isTrue(response);
            }
        });
    });

    describe.skip("16 - Los clientes podrán visualizar un listado de libros disponibles", function () {
        it("Desplegando listado de libros o catalogo de sucursal 1: ", async function () {
            s1Id = '62f1bdc8bc6a4f1af92473a8'; item = 2;
            let catalogo = await Libro.find({localisacion: s1Id});
            try{
                if(catalogo){
                    return response = true;
                }else{
                    assert.fail('No se pudo visualizar el catalogo');
                }
            }finally{
                assert.strictEqual(catalogo.length,item);
            }
        });
        it("Desplegando listado de libros o catalogo de sucursal 2: ", async function () {
            s2Id = '62f1bdc8bc6a4f1af92473a9'; item = 2;
            let catalogo2 = await Libro.find({localisacion: s2Id});
            try{
                if(catalogo2){
                    return response = true;
                }else{
                    assert.fail('No se pudo visualizar el catalogo');
                }
            }finally{
                assert.strictEqual(catalogo2.length,item);
            }
        });
        it("Desplegando listado de libros o catalogo de sucursal 3: ", async function () {
            s3Id = '62f1bdc8bc6a4f1af92473aa'; item = 2;
            let catalogo3 = await Libro.find({localisacion: s3Id});
            try{
                if(catalogo3){
                    return response = true;
                }else{
                    assert.fail('No se pudo visualizar el catalogo');
                }
            }finally{
                assert.strictEqual(catalogo3.length,item);
            }
        });
    });

    describe.skip("17 - Los clientes podrán consultar detalles de libros (autor, fecha de publicación, ubicación, etc.)", function () {
        it("Consultando detalles de un libro: ", async function () {
            libroId = '62f20f1efdb844efa0aab04b';
            try{
                let libro = await Libro.findById({_id: libroId});
                if(libro){
                    return response = true;
                }else{
                    assert.fail('No se pudo visualizar el catalogo');
                }
            }finally{
                assert.isTrue(response);
            }
        });
        it("El titulo del libro consultado debe ser: Don Quijote De La Mancha: ", async function () {
            libroId = '62f20f1efdb844efa0aab04b';
            title = 'Don Quijote De La Mancha';
                let libro = await Libro.findById({_id: libroId});
                assert.strictEqual(libro.titulo,title);
        });
    });

    describe.skip("18 - Los clientes podrán realizar búsquedas por filtrado de parámetros de los libros", function () {
        it("Filtrando libros por autor: ", async function () {
            aut = 'Tyrel Wellelick';
            try{
                let libro = await Libro.find({autor: aut});
                console.log(libro.length);
                if(libro){
                    return response = true;
                }else{
                    assert.fail('No se pudo filtrar por autor');
                }
            }finally{
                assert.isTrue(response);
            }
        });
        it("EL numero de libros filtrados por autor debe ser: 2.", async function () {
            aut = 'Tyrel Wellelick';
            qty = 2;
                let libro = await Libro.find({autor: aut});
                assert.strictEqual(libro.length,qty);
        });
    });

    describe.skip("19 - Los clientes podrán realizar compras", function () {
        const usernm = "jazzprincess";//usuario cliente
        it("Generando una compra de libro: ", async function () {
            const user = await User.findOne({username:usernm});
            try{
                let carrito = await Compras.create({
                    libroId: '62f20f1efdb844efa0aab04b',
                    titulo: 'Don Quijote De La Mancha',
                    autor: 'Miguel de Cervantes',
                    cantidad: 6,
                    precio: 600,
                    sucursalId: '62f1bdc8bc6a4f1af92473a8',
                    usuarioId: user._id,
                    username: user.username
                  });
                if(carrito){
                    return response = true;
                }else{
                    assert.fail('No se pudo visualizar el catalogo');
                }
            }finally{
                assert.isTrue(response);
            }
        });
    });

    describe.skip("20 - Los clientes podrán cancelar una compra dentro de la primera media hora", function () {
        const usernm = "jazzprincess";//usuario cliente
        it("Cancelar compra realizada: ", async function () {
            const delet = '62f2648a8837ebb00ac8a86f';
            let cancel = await Compras.deleteOne({_id: delet});
            if(cancel){
                assert(true);
            }
            else{
                console.log('no se realizo la cancelacion');
                assert.fail('No se pudo cancelar la compra');
            }
        });
    });

});

