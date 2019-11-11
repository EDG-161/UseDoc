const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();
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

function guardarHistorial(historia,back){
	var parentales = historia.enfermedadesParentales;
	var cirugias = historia.cirugias;
	var alergias = historia.algergias;
	var vivienda = historia.vivienda;
	var valido = true;
	parentales.forEach(function(element){
		if(valida.validarAspectos(element[0])&&valida.validarAspectos(element[1])&&valida.validarAspectos(element[2])){
			
		}else{
			valido = false;
		}
	});
	cirugias.forEach(element=>{
		if(valida.){

		}
	});
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