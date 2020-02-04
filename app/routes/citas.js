const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();
const metodosJSON = require('./metodosJSON');
const aes = require("./aes");

function agregarCita(idmed,idpac,des,dat,tip,callback){
	connection.query("INSERT INTO mcitas (id_pac, id_med, des_cit, dat_cit, id_tip) VALUES ("+idpac+","+idmed+",'"+aes.cifrar(des)+"','"+aes.cifrar(dat)+"',"+tip+")",(err,result)=>{
		if (!err) {
			callback(null,result[0]);
		}else{
			callback(false,result);
		}
	});
}

function cancelarCita(id){
	let d = "Cita Cancelada";
	connection.query("UPDATE mcitas SET des_cit='"+aes.cifrar(d)+"' WHERE id_cit = "+id+" ",(err,result)=>{
		if (!err) {
			callback(null,result[0]);
		}else{
			callback(false,result);
		}
	});
}

function guardarHistorial(historia,req,callback){
	var parentales = historia.enfermedadesParentales;
	var cirugias = historia.cirugias;
	var alergias = historia.alergias;
	var vivienda = historia.vivienda;
	var valido = true;
	var mensaje = "";
	var tmen = "";
	if(typeof parentales !== "undefined"){
		parentales.forEach(function(element){
			if(!valida.validarAspectos(element[0])||!valida.validarAspectos(element[1])||!valida.validarAspectos(element[2])){
				if (!valida.validarAspectos(element[0])) {
					mensaje += "El nombre de enfermedad solo debe contener letras <br/>";
				}
				if (!valida.validarAspectos(element[1])) {
					mensaje += "El parentesco solo debe contener letras <br/>";
				}
				if (!valida.validarAspectos(element[2])) {
					mensaje += "La categoria no es valida <br/>";
				}
				valido = false;
			}
		});
	}
	if(!(!cirugias)){
		cirugias.forEach(element=>{
			if(!valida.validarAspectos(element[0])|| !valida.validarFechas(element[1])){
				if (!valida.validarAspectos(element[0])) {
					mensaje += "El nombre de la cirugia solo debe contener letras\n";
				}
				if (!valida.validarFecha(element[1])) {
					mensaje += "La fecha no es valida\n";
				}
				valido = false;
			}
		});
	}
	if(alergias){
		alergias.forEach(element=>{
			if (!valida.validarAspectos(element[0])) {
				valido= false;
				mensaje += "La alergia solo debe contener letras y numeros";
			}
		});
	}
	if(vivienda){
		vivienda.forEach(element=>{
			if (!valida.validarAspectos(element[0])) {
				mensaje += "Los aspectos de vivienda solo deben contener letras y numeros"
				valido = false;
			}
		});
	}
	
	if (valido) {
		var name = `hta_${historia.id_pac}`;
		var pass = `${name}cas31${name}19562348451asdfbkhjb`
		var content = JSON.stringify(historia);
		var historialJ = metodosJSON.guardarHistorial(name,content,pass);
		connection.query(`SELECT * FROM mhistoriales WHERE id_pac = ${historia.id_pac}`,(err,result)=>{
			if (!err) {
				if (result.length>0) {
					var fechaActual = new Date();
					var fechaStr = fechaActual.getDate() + "-" + (fechaActual.getMonth()+1) + "-" + fechaActual.getFullYear();
					connection.query(`UPDATE mhistoriales SET rut_his='${historialJ}' ,fec_his='${fechaActual}' WHERE id_pac=${historia.id_pac}`,(er, res)=>{
						if (!er) {
							mensaje = "Datos guardados correctamente";
							tmen = "success";
							callback(mensaje,tmen);
						}else{
							mensaje = "Algo ocurrio vuelve a intentar";
							tmen = "error";
							callback(mensaje,tmen);
						}
					});
				}else{
					var fechaActual = new Date();
					var fechaStr = fechaActual.getDate() + "-" + (fechaActual.getMonth()+1) + "-" + fechaActual.getFullYear();
					connection.query(`INSERT INTO mhistoriales (rut_his,id_pac,fec_his) VALUES ('${historialJ}',${historia.id_pac},'${fechaActual}')`,(er, res)=>{
						if (!er) {
							mensaje = "Datos guardados correctamente";
							tmen = "success";
							callback(mensaje,tmen);
						}else{
							mensaje = "Algo ocurrio vuelve a intentar";
							tmen = "error";
							callback(mensaje,tmen);
						}
					});
				}
			}else{
				mensaje = "Algo ocurrio vuelve a intentar";
				tmen = "error";
				callback(mensaje,tmen);
			}
		});
	}else{
		callback(mensaje,"error");
	}
}

function finalizarCita(cita,req,callback){
	var sintomas = cita.sintomas;
	var medicamentos = cita.medicamentos;
	var laboratorio = cita.laboratorio;
	var tratamiento = cita.tratamiento;
	var diagnostico = cita.diagnostico;
	var notas = cita.notas;
	var valido = true;
	var mensaje = "";
	var tmen = "";
	sintomas.forEach(function(element){
		if(!valida.validarAspectos(element[0])||!valida.validarAspectos(element[1])||!valida.validarFechas(element[2])){
			if (!valida.validarAspectos(element[0])) {
				mensaje += "El nombre del sintoma solo debe contener letras <br/>";
			}
			if (!valida.validarAspectos(element[1])) {
				mensaje += "El las notas no deben contener caracteres especiales <br/>";
			}
			if (!valida.validarAspectos(element[2])) {
				mensaje += "La fecha de inicio del sintoma no es valida <br/>";
			}
			valido = false;
		}
	});
	medicamentos.forEach(element=>{
		if(!valida.validarAspectos(element[0]) || !valida.validarNumeros(element[1]) || !valida.validarAspectos(element[2])){
			if (!valida.validarAspectos(element[0])) {
				mensaje += "El nombre del medicamento solo debe contener letras y numeros<br>";
			}
			if (!valida.validarFecha(element[1])) {
				mensaje += "La dosis debe de ser un numero<br>";
			}
			if (!valida.validarAspectos(element[2])) {
				mensaje += "La unidad de medida no es valida<br>";
			}
			valido = false;
		}
	});

	if (laboratorio[0]) {
		laboratorio[1].forEach(element=>{
			if (!valida.validarAspectos(element)){
				valido = false;
				mensaje += "El nombre del examen de laboratorio no debe contener carateres especiales";
			}
		});
		diagnostico = [];
		tratamiento = [];
	}else{
		diagnostico.forEach(element=>{
			if (!valida.validarAspectos(element[0]) || !valida.validarAspectos(element[1]) || !valida.validarAspectos(element[2])) {
				valido = false;
				if (!valida.validarAspectos(element[0])) {
					mensaje += "El nombre del padecimiento debe estar libre de caracteres especiales<br>";
				}
				if (!valida.validarAspectos(element[1])) {
					mensaje += "La clacificacion del diagnostico no es valida<br>";
				}
				if (!valida.validarAspectos(element[2])) {
					mensaje += "Las notas del diagnostico deben estar libres de caracteres especiales<br>";
				}
			}
		});
		tratamiento.forEach(element=>{
			if (!valida.validarAspectos(element[0]) || !valida.validarNumeros(element[1]) || !valida.validarAspectos(element[2]) || !valida.validarHoras(element[3]) || !valida.validarNumeros(element[4]) ) {
				valido = false;
				if (!valida.validarAspectos(element[0])) {
					mensaje+= "El nombre del medicamento no debe contener caracteres esperciales <br>"
				}
				if (!valida.validarNumeros(element[1])) {
					mensaje+= "La cantidad de dosis debe de ser un numero <br>"
				}
				if (!valida.validarAspectos(element[2])) {
					mensaje+= "El tipo de unidad no es valido <br>"
				}
				if (!valida.validarHoras(element[3])) {
					mensaje+= "Las horas de aplicacion no son validas <br>"
				}
				if (!valida.validarNumeros(element[4])) {
					mensaje+= "Los dias de tratamiento deben ser numero <br>"
				}
			}
		});
	}

	notas.forEach(element=>{
		if (!valida.validarAspectos(element[0])) {
			valido= false;
			mensaje += "Las notas solo deben contener letras y numeros";
		}
	});
	if (valido) {
		var name = `cit_${cita.id_pac}_${cita.id_cit}`;
		var pass = `${name}cas31${name}19562348451asdfbkhjb`
		var content = JSON.stringify(cita);
		var historialJ = metodosJSON.guardarCitas(name,content,pass);
		connection.query(`UPDATE mcitas set id_tip=1 WHERE id_cit = ${cita.id_cit}`,(err,result)=>{
			if (!err) {
				mensaje = "Cita finalizada exitosamente";
				tmen = "success";
				callback(mensaje,tmen);
			}else{
				mensaje = "Algo ocurrio vuelve a intentar";
				tmen = "error";
				callback(mensaje,tmen);
			}
		});
	}else{
		callback(mensaje,"error");
	}
}

function obtenerCita(id){

}

function obtenerCitasMedico(idmed){
	connection.query("SELECT * FROM mcitas WHERE id_med = "+idmed+"",(err,result)=>{
		if (!err) {
			callback(null,result[0]);
		}else{
			callback(false,result);
		}
	});
}

function obtenerCitasPaciente(idpac){
	connection.query("SELECT * FROM mcitas WHERE id_pac = "+idpac+"",(err,result)=>{
		if (!err) {
			callback(null,result[0]);
		}else{
			callback(false,result);
		}
	});
}

function eliminarCita(id){
	connection.query("DELETE FROM mcitas WHERE id_cit = "+id+" ",(err,result)=>{
		if (!err) {
			callback(null,result[0]);
		}else{
			callback(false,result);
		}
	});
}

exports.finalizarCita = finalizarCita;
exports.guardarHistorial = guardarHistorial;
