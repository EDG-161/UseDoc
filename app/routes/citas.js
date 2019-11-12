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
	alergias.forEach(element=>{
		if (!valida.validarAspectos(element[0])) {
			valido= false;
			mensaje += "La alergia solo debe contener letras y numeros";
		}
	});
	vivienda.forEach(element=>{
		if (!valida.validarAspectos(element[0])) {
			mensaje += "Los aspectos de vivienda solo deben contener numeros"
			valido = false;
		}
	});
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
							console.log(er);
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
							console.log(er);
							mensaje = "Algo ocurrio vuelve a intentar";
							tmen = "error";
							callback(mensaje,tmen);
						}
					});
				}
			}else{
				console.log(err);
				mensaje = "Algo ocurrio vuelve a intentar";
				tmen = "error";
				callback(mensaje,tmen);
			}
		});
	}else{
		console.log("No valido");
		callback(mensaje,"error");
	}
}

function finalizarCita(historia,){
	let d = "Cita Finalizada";



	connection.query("UPDATE mcitas SET des_cit='"+aes.cifrar(d)+"' WHERE id_cit = "+id+" ",(err,result)=>{
		if (!err) {
			callback(null,result[0]);
		}else{
			callback(false,result);
		}
	});
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
