const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();

function obtenerDoctores(id,callback){
	connection.query('SELECT * FROM mpaciente_medico where id_pac='+id,(err,result)=>{
		if (!err) {
			for (var i = 0; i < result.length; i++) {
				let doctores = [];
				connection.query('SELECT * FROM mdoctores where id_doc = ' + result[i].id_med,(er,res)=>{
						doctores.push(res[0]);
				});
			}
			callback(doctores);
		}
	});
}

exports.obtenerDoctores = obtenerDoctores;
