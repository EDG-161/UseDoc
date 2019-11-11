const Metodos = require('../app/routes/Metodos.js');
const validaciones = require('../app/routes/validaciones.js');

var assert = require('assert');
//prueba de Metodos
describe('Metodos', function() {
    describe('crear()', function() {
        it('debe retornar -1 cuando el valor no esta presente', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

//metodos de validaciones 
describe('validaciones', function() {
    describe('crear()', function() {
        it('debe retornar -1 cuando el valor no esta presente', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
    //validaciones del nombre
    describe('Largo', function() {
        it('Cadenas sean string', function validarNombre() {
            assert.toString;
        });
    });
    describe('Largo', function() {
        it('Cadenas sean string', function validarNombre() {
            assert.length < 0;
        });
    });

    //validaciones Email
    describe('Largo', function() {
        it('Cadenas sean string', function validarEmail() {
            assert.toString;
        });
    });
    //validaciones Password
    describe('Largo', function() {
        it('Cadenas sean string', function validarPassword() {
            assert.toString;
        });
    });
    //validaciones Código postal
    describe('Largo', function() {
        it('Cadenas sean string', function validarCodigoP() {
            assert.toString;
        });
    });
    //validaciones telefono
    describe('Largo', function() {
        it('Cadenas sean string', function validarTelefono() {
            assert.toString;
        });
    });
    //validaciones Cédula
    describe('Largo', function() {
        it('Cadenas sean string', function validarCedula() {
            assert.toString;
        });
    });
    //validaciones Lógin
    describe('Largo', function() {
        it('Cadenas sean string', function validarLogin() {
            assert.toString;
        });
    });


});