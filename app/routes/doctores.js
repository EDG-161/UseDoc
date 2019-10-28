const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();
const aes = require('./aes');

function obtenerPacientes(id, callback){
    connection.query('SELECT * FROM mpaciente_medico where id_med = '+ id,(err,res)=>{
        if(err){
            console.log("Error obtenerPacientes     " + err);
        }else{
            let cad = "SELECT * FROM mpacientes where ";

            for(var i = 0; i<res.length; i++){
                if(i == (res.length-1)){
                    cad += "id_usr = " + res[i].id_pac;
                }else{
                    cad += "id_usr = " + res[i].id_pac + " && ";
                }
            }

            connection.query(cad,(er,resu)=>{
                if(!er){
                    for(var i = 0; i<resu.length ; i++){
                        resu[i].nom_pac = aes.decifrar(resu[i].nom_pac);
                        resu[i].appat_pac = aes.decifrar(resu[i].appat_pac);
                        resu[i].apmat_pac = aes.decifrar(resu[i].apmat_pac);
                    }
                    callback(resu);
                }else{
                    console.log("No hay pacientes")
                    callback([]);
                }
            });
        }
    });
}

function obtenerCitas(id,callback){
	try{
		connection.query('SELECT * FROM mcitas where id_pac='+id,(err,result)=>{
			if (!err) {
        for (var i = 0; i < result.length; i++) {
					result[i].des_cit = aes.decifrar(result[i].des_cit);
					result[i].dat_cit = aes.decifrar(result[i].dat_cit);
				}
				callback(result);
			}else{
				callback([]);
				console.log("error en obtener citas:  " +err);
			}
		});
	}catch(error){
		console.log("Error obtener datos");
	}
}

function obtenerPacienteById(id, callback){
  connection.query('Select * from mpacientes where id_pac=' + id,(err,res)=>{
    if (!err) {
      if (typeof res[0].nom_pac!=="undefined") {
        res[0].nom_pac = aes.decifrar(res[0].nom_pac);
        res[0].appat_pac = aes.decifrar(res[0].appat_pac);
        res[0].apmat_pac = aes.decifrar(res[0].apmat_pac);
        connection.query('SELECT * FROM mdatos where id_usr = '+res[0].id_usr,(e,r)=>{
          if (!err) {
            if (typeof r[0].id_usr !== "undefined") {
              r[0].tel_dat = aes.decifrar(r[0].tel_dat);
              r[0].numext_dat = aes.decifrar(r[0].numext_dat);
              r[0].numint_dat = aes.decifrar(r[0].numint_dat);
              r[0].calle_dat = aes.decifrar(r[0].calle_dat)  ;
              r[0].del_dat = aes.decifrar(r[0].del_dat);
              r[0].col_dat = aes.decifrar(r[0].col_dat);
              r[0].codpost_dat = aes.decifrar(r[0].codpost_dat);
              let respuesta = [res[0],r[0]];
              callback(respuesta);
            }else{
              callback([]);
            }
          }else{
            callback([]);
          }
        });
      }else{
        callback([]);
      }
    }
  });
}

exports.obtenerCitas = obtenerCitas;
exports.obtenerPacientes = obtenerPacientes;
exports.obtenerPacienteById = obtenerPacienteById;
