const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();

function agregarCita(idmed,idpac,des,tip,callback){
	connection.query("INSERT INTO mcitas (id_pac, id_med, des_cit, dat_cit, id_tip) VALUES ("+idpac+","+idmed+",'"+des+"','Sin finalizar',"+tip+")",(err,result)=>{
		if (!err) {
			callback(null,result[0]);
		}else{
			callback(false,result);
		}
	});
}

function cancelarCita(id){

}

function finalizarCita(id,rec,recb){

}

function obtenerCita(id){

}

function obtenerCitas(id){

}

function obtenerCitasPaciente(idpac){

}

function eliminarCita(){

}