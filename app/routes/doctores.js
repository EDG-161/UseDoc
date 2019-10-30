const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();
const aes = require('./aes');

function obtenerPacientes(id, callback){
    connection.query("SELECT * FROM mdoctores where id_usr="+id,(er1,re1)=>{
      connection.query('SELECT * FROM mpaciente_medico where id_med = '+ re1[0].id_med,(err,res)=>{
          if(err){
              console.log("Error obtenerPacientes     " + err);
          }else{
              let cad = "SELECT * FROM mpacientes where ";

              for(var i = 0; i<res.length; i++){
                  if(i == (res.length-1)){
                      cad += "id_pac = " + res[i].id_pac;
                  }else{
                      cad += "id_pac = " + res[i].id_pac + " && ";
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
    });

}

function obtenerCitas(id,callback){
	try{
		connection.query("SELECT * from mdoctores WHERE id_usr="+id,(er1,re1)=>{
      connection.query('SELECT * FROM mcitas where id_med='+re1[0].id_med,(err,result)=>{
  			if (!err) {
          console.log('SELECT * FROM mcitas where id_med='+re1[0].id_med);
          for (var i = 0; i < result.length; i++) {
  					result[i].des_cit = aes.decifrar(result[i].des_cit);
  					result[i].dat_cit = aes.decifrar(result[i].dat_cit);
            result[i].hor_cit = aes.decifrar(result[i].hor_cit);
  				}
  				callback(result);
  			}else{
  				callback([]);
  				console.log("error en obtener citas:  " +err);
  			}
  		});
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
              console.log(respuesta);
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

function agendarCita(req,res,id,date,des,hor){
  connection.query("SELECT * FROM mdoctores where id_usr="+req.session.user.id_usr,(er1,re1)=>{
    connection.query("INSERT INTO mcitas (id_pac,id_med,des_cit,dat_cit,id_tip,hor_cit) values("+id+","+re1[0].id_med+",'"+aes.cifrar(des)+"','"+aes.cifrar(date)+"',2,'"+aes.cifrar(hor)+"')",(er,re)=>{
      if (!er) {
        console.log("INSERT INTO mcitas (id_pac,id_med,des_cit,dat_cit,id_tip) values("+id+","+re1[0].id_med+",'"+aes.cifrar(des)+"','"+aes.cifrar(date)+"',2)");
        res.redirect('/paciente?p='+id+'&men=Cita agendada');
      }else{
        console.log("INSERT INTO mcitas (id_pac,id_med,des_cit,dat_cit,id_tip) values("+id+","+re1[0].id_med+",'"+aes.cifrar(des)+"','"+aes.cifrar(date)+"',2)");
        console.log("error agendar    "+ er );
        res.redirect('/paciente?p='+id+'&men=Algo ocurrio vuelve a intentar');
      }
    });
  });
}

exports.obtenerCitas = obtenerCitas;
exports.obtenerPacientes = obtenerPacientes;
exports.obtenerPacienteById = obtenerPacienteById;
exports.agendarCita = agendarCita;
