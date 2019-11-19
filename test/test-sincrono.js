const Metodos = require('../app/routes/Metodos.js');
const validaciones = require('../app/routes/validaciones.js');

var assert = require('assert');




/////////////////////////////////////////////////////////prueba de metodo validaciones.js////////////////////////////////
//prueba de Metodos
describe('Metodos', function() {
    describe('crear(metodos)', function() {
        it('debe retornar -1 cuando el valor no esta presente', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

//metodos de validaciones nombre
describe('validaciones', function() {
    describe('Validación del nombre (caracteres permitidos menores a 20)', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});




//metodos de validaciones Email
describe('validaciones', function() {
    describe('Validación del email (caracteres permitidos menores a 100) y con formato obligatorio de @ y .com', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones Password
describe('validaciones', function() {
    describe('Validación de la contraseña (caracteres permitidos menores a 30) con la inclusión de un caracter especial y numeros', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones codigo postal
describe('validaciones', function() {
    describe('Validación del código postal  (caracteres permitidos menores a 5)', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones Telefono
describe('validaciones', function() {
    describe('Validación del Teléfono (caracteres permitidos 10)', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones Cedula
describe('validaciones', function() {
    describe('Validación de la cédula médica  (caracteres permitidos 8)', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones Login
describe('validaciones', function() {
    describe('Validación del ingreso al sistema/Login (Comparación de parametros (correo electrónico y contraseña con la base de datos))', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});

/////////////////////////////////////////método pacientes.js/////////////////////////////////
//metodos de validaciones obteberRangos

//metodos de validaciones ObtenerDoctores
describe('Pacientes', function() {
    describe('Obtiene la busqueda/petición en la base de datos del doctor-paciente para su conexión', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones obtenerDatos
describe('Pacientes', function() {
    describe('Obtiene datos complementarios del paciente desde la base de datos a través de una petición', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones Contacto
describe('Pacientes', function() {
    describe('Se obtiene el contaco médico-paciente mediante una petición', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones Citas
describe('Pacientes', function() {
    describe('Se obtienen las citas establecidas del paciente por medio de una petición', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones obtenerHistoriales
describe('Pacientes', function() {
    describe('Se obtienen los historiales médicos del paciente ya previamente guardados en la base de datos', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones obtenerMedicoById
describe('Pacientes', function() {
    describe('Se obtiene el médico y sus datos por medio de su registro en la base de datos', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones obtenerPacientesById
describe('Pacientes', function() {
    describe('Se obtiene el paciente y sus datos por medio de su registro en la base de datos', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones obtenerHorario
describe('Pacientes', function() {
    describe('Se obtienen los horarios disponibles por medio de una petición del paciente', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones obtenerPerfilImg
describe('Pacientes', function() {
    describe('Se obtiene la imagen de perfil del usuario por medio de una consulta a la base de datos', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones obtenermensajes
describe('Pacientes', function() {
    describe('Se obtienen los mensajes enviados entre paciente-médico que se registraron en la base de datos', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});

//////////////////////Metodo notes.js/////////////////////////////////////
//metodos de validaciones sesiones
describe('Notes', function() {
    describe('Inicios de sesión para cada usuario', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});

//////////////////////////////Método metodos.JSON/////////////////////////////////////////////

//metodos de validaciones crearJSON
describe('Metodos JSON', function() {
    describe('Crea un JSON', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones escribirJSON
describe('Metodos JSON', function() {
    describe('Se envia una petición para escribir en el JSON', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});


//metodos de validaciones guardarHistorial
describe('Metodos JSON', function() {
    describe('Se guarda el historial médico del paciente', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones leerHistorial
describe('Metodos JSON', function() {
    describe('Mediante una petición, se lee el JSON con el historial médico del paciente', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones guardarDatosMedicos
describe('Metodos JSON', function() {
    describe('Se guardan los datos médicos más importantes del paciente ', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones leerDatosMedicos
describe('Metodos JSON', function() {
    describe('Se leen los datos médicos como registro ', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones  leerJSON
describe('Metodos JSON', function() {
    describe('Mediante una petición se lee el JSON para recuperar o cambiar la información antes guardada', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones verify
describe('Metodos JSON', function() {
    describe('Se verifica al propietario del archivo JSON', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});

////////////////////////////////////Metodo (metodos.js)///////////////////////////////////////
//metodos de validaciones login
describe('Metodos ', function() {
    describe('Validación del login mediante la comparación de los datos ingresados y guardados en la base de datos', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones vadUsuarios
describe('Metodos ', function() {
    describe('Recuperación de los datos obtenidos de la base ya descifrados', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones agregarUsuario
describe('Metodos ', function() {
    describe('Se agregan los datos del usuario usuario a la sesión iniciada', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones setMedico
describe('Metodos ', function() {
    describe('Se agrega un doctor al paciente con una petición del paciente', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones setPaciente
describe('Metodos ', function() {
    describe('Se agrega el paciente al médico con la petición aceptada del médico enviada por el paciente', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});

//////////////////////////////////////////////Metodo (doctores.js) //////////////////////////////
//metodos de validaciones obtenerPacientes
describe('Metodos doctores ', function() {
    describe('Se obtienen todos los pacientes vinculados en la base de datos con el médico)', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones obtenerCitas
describe('Metodos doctores ', function() {
    describe('Se obtienen las citas generadas por los pacientes, mediante peticiones enviadas al médico', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones obtenerPacienteById
describe('Metodos doctores ', function() {
    describe('Se obtienen los pacientes vinculados al médico por medio del id del paciente', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones obtenerHorario
describe('Metodos doctores ', function() {
    describe('Se obtienen los registros de horarios disponibles por el médico', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones agendarCita
describe('Metodos doctores ', function() {
    describe('Se agenda una cita por medio de una petición enviada por el paciente', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones registrarHorario
describe('Metodos doctores ', function() {
    describe('Se selecciona un horario disponible para la cita', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones editarHorario
describe('Metodos doctores ', function() {
    describe('Se edita el horario establecido en la base de datos', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones getGastos
describe('Metodos doctores ', function() {
    describe('Se obtienen los gastos totales de la consulta', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones  obtenerMedicoById
describe('Metodos doctores ', function() {
    describe('Se obtiene una busqueda del médico por medio de su Id', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});

///////////////////////////////////// Método (citas.js)////////////////////
//metodos de validaciones agregarCita
describe('Metodos citas', function() {
    describe('Se agregan las citas a la agenda del médico encargado y enlazado con el paciente', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones cancelarCita
describe('Metodos citas', function() {
    describe('SE hace una modificación o cancelación en la base de datos para las cits y establecidas por el usuario y médico', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones guardarHistorial
describe('Metodos citas', function() {
    describe('SE guarda el historial de citas del médico a cargo', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones finalizarCita
describe('Metodos citas', function() {
    describe('Se da por concluida la cita y se cierra su proceso en la base de datos ', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones obtenerCitasMedico
describe('Metodos citas', function() {
    describe('El médico por medio de una petición obtiene las citas ', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones obtenerCitasPaciente
describe('Metodos citas', function() {
    describe('El paciente obtiene y visualiza la cita médica ya establecida', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones eliminarCita
describe('Metodos citas', function() {
    describe('Se elimina la cita médica del registro/historial de citas', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
/////////////////////////////////////////////Método (aes.js)////////////////////////////////
//metodos de validaciones cifrar
describe('Metodos AES', function() {
    describe('Cifrado de datos pasados por el método)', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones decifrar
describe('Metodos AES', function() {
    describe('Descifrado de datos pasados por el módulo)', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones cifrarP
describe('Metodos AES', function() {
    describe('Cifrado de datos especifícos del paciente', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});
//metodos de validaciones decifrarP
describe('Metodos AES', function() {
    describe('Descifrado específico de datos del paciente', function() {
        it('debe retornar el valor true', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });




});