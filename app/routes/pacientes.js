const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();

function obtenerDoctores(id,callback){
	try{
		connection.query('SELECT * FROM mpaciente_medico where id_pac='+id,(err,result)=>{
			if (!err) {
				let doctores = [];
				
				for (var i = 0; i < result.length; i++) {
					console.log(result[i]);
					
					connection.query('SELECT * FROM mdoctores where id_med = ' + result[i].id_med,(er,res)=>{
						if(er){
							console.log("error " + er);
						}else{
							doctores.push(res[0]);
							
						}
					});
				}
				
				callback(doctores);
			}else{
				console.log("error en obtener doctores:  " +err);
			}
		});
	}catch(error){
		console.log("Error obtener doctores");
	}
}

exports.obtenerDoctores = obtenerDoctores;
