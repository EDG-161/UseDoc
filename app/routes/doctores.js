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

exports.obtenerPacientes = obtenerPacientes;