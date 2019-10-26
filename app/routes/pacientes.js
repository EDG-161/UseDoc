const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();
const aes = require('./aes');

function obtenerRangos(id,callback){
	connection.query('select * from mpaciente_medico where id_pac='+id,(err,res)=>{
		if(!err){
			if(res.length>0){
				callback(res);
			}
		}
	});
}

function obtenerDoctores(id,callback){
	try{
		connection.query('SELECT * FROM mpaciente_medico where id_pac='+id,(err,result)=>{
			if (!err) {
				let doctores = [];
				let cad = "SELECT * FROM mdoctores where ";
				for (var i = 0; i < result.length; i++) {
					if(i == (result.length-1)){
						cad += "id_usr = "+ result[i].id_med;
					}else{
						cad += "id_usr = "+ result[i].id_med + " && ";
					}
				}
				console.log(cad);
				connection.query(cad,(er,res)=>{
					if(er){
						console.log("error " + er);
					}else{
						for(var c = 0; c < res.length;c++){
							res[c].name_med = aes.decifrar(res[c].name_med);
							res[c].appat_med = aes.decifrar(res[c].appat_med);
							res[c].apmat_med = aes.decifrar(res[c].apmat_med);
							res[c].ced_med = aes.decifrar(res[c].ced_med);
						}
						console.log(res);
						callback(res);
					}
				});
			}else{
				console.log("error en obtener doctores:  " +err);
			}
		});
	}catch(error){
		console.log("Error obtener doctores");
	}
}

exports.obtenerDoctores = obtenerDoctores;
exports.obtenerRangos = obtenerRangos;