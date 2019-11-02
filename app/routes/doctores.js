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
  					if (result[i].des_cit!="Sin descripcion") {
              result[i].des_cit = aes.decifrar(result[i].des_cit);
            }
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

function obtenerHorario(id,callback){
  connection.query('SELECT * FROM mdoctores WHERE id_usr='+id, (err,result)=>{
    if (!err) {
      connection.query('SELECT * FROM mhorario_medico WHERE id_med='+result[0].id_med,(er,resu)=>{
        if (!er) {
          if (resu.length>0) {
            resu[0].hi_hor = aes.decifrar(resu[0].hi_hor);
            resu[0].hf_hor = aes.decifrar(resu[0].hf_hor);
            resu[0].tiem_hor = aes.decifrar(resu[0].tiem_hor);
            resu[0].di_hor = aes.decifrar(resu[0].di_hor);
            callback(resu);
          }else{
            callback(resu);
          }
        }else {
          console.log("Error obtenerHorario 1   "+ er);
        }
      });
    }else{
      console.log("Error obtenerHorario    " + err);
      callback([]);
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

function registrarHorario(req,res) {
  const { L } = req.body;
  const { M } = req.body;
  const { N } = req.body;
  const { J } = req.body;
  const { V } = req.body;
  const { S } = req.body;
  const { D } = req.body;
  const { hi } = req.body;
  const { hf } = req.body;
  const { th } = req.body;
  let dias = "";
  if (typeof L != "undefined") {
    dias+="1";
  }
  if (typeof M != "undefined") {
    dias+="2";
  }
  if (typeof N != "undefined") {
    dias+="3";
  }
  if (typeof J != "undefined") {
    dias+="4";
  }
  if (typeof V != "undefined") {
    dias+="5";
  }
  if (typeof S != "undefined") {
    dias+="6";
  }
  if (typeof D != "undefined") {
    dias+="7";
  }
  if (dias.length>0) {
    let hv = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    let thv = /^[0][0-1]:[0-5][0-9]$/
    if (hv.test(hi)&&hv.test(hf)&&hv.test(th)) {
      if (hi<hf) {
        if (hv.test(th)) {
          if (th>="00:10"&&th<="02:00") {
            connection.query('SELECT * FROM mdoctores WHERE id_usr='+req.session.user.id_usr,(err,result)=>{
              if (!err) {
                connection.query("INSERT INTO mhorario_medico (id_med, hi_hor, hf_hor, tiem_hor, di_hor) values ("+result[0].id_med+",'"+aes.cifrar(hi)+"','"+aes.cifrar(hf)+"','"+aes.cifrar(th)+"','"+aes.cifrar(dias)+"')",(er,resu)=>{
                  if (!er) {
                    res.redirect('/Home?men=Horario establecido exitosamente');
                    res.end();
                  }else{
                    console.log("error registrarHorario1:   " + err);
                    res.redirect('/Home?men=Algo ocurrio');
                    res.end();
                  }
                });
              }else{
                console.log("error registrarHorario:   " + err);
                res.redirect('/Home?men=Algo ocurrio');
                res.end();
              }
            });
          }else{
            res.redirect('/Home?men=El tiempo promedio de cita debe ser de entre 10min y 2 hrs');
            res.end();
          }
        }else{
          res.redirect('/Home?men=El tiempo promedio de cita no es valido');
          res.end();
        }
      }else{
        res.redirect('/Home?men=La hora de salida debe ser mayor a la de entrada');
        res.end();
      }
    }else{
      res.redirect('/Home?men=Ingresa horas validas');
      res.end();
    }
  }else{
    res.redirect('/Home?men=Debes seleccionar al menos un día de trabajo');
    res.end();
  }
}

function editarHorario(req,res) {
  const { L } = req.body;
  const { M } = req.body;
  const { N } = req.body;
  const { J } = req.body;
  const { V } = req.body;
  const { S } = req.body;
  const { D } = req.body;
  const { hi } = req.body;
  const { hf } = req.body;
  const { th } = req.body;
  let dias = "";
  if (typeof L != "undefined") {
    dias+="1";
  }
  if (typeof M != "undefined") {
    dias+="2";
  }
  if (typeof N != "undefined") {
    dias+="3";
  }
  if (typeof J != "undefined") {
    dias+="4";
  }
  if (typeof V != "undefined") {
    dias+="5";
  }
  if (typeof S != "undefined") {
    dias+="6";
  }
  if (typeof D != "undefined") {
    dias+="7";
  }
  if (dias.length>0) {
    let hv = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    let thv = /^[0][0-1]:[0-5][0-9]$/
    if (hv.test(hi)&&hv.test(hf)&&hv.test(th)) {
      if (hi<hf) {
        if (hv.test(th)) {
          if (th>="00:10"&&th<="02:00") {
            connection.query('SELECT * FROM mdoctores WHERE id_usr='+req.session.user.id_usr,(err,result)=>{
              if (!err) {
                connection.query("Update mhorario_medico  set hi_hor = '"+aes.cifrar(hi)+"', hf_hor='"+aes.cifrar(hf)+"', tiem_hor='"+aes.cifrar(th)+"', di_hor='"+aes.cifrar(dias)+"' WHERE id_med="+result[0].id_med,(er,resu)=>{
                  console.log("Update mhorario_medico  set hi_hor = '"+aes.cifrar(hi)+", hf_hor='"+aes.cifrar(hf)+"', tiem_hor='"+aes.cifrar(th)+"', di_hor='"+aes.cifrar(dias)+"' WHERE id_med="+result[0].id_med);
                  if (!er) {
                    res.redirect('/Home?men=Horario editado exitosamente');
                    res.end();
                  }else{
                    console.log("error registrarHorario1:   " + err);
                    res.redirect('/Home?men=Algo ocurrio');
                    res.end();
                  }
                });
              }else{
                console.log("error registrarHorario:   " + err);
                res.redirect('/Home?men=Algo ocurrio');
                res.end();
              }
            });
          }else{
            res.redirect('/Home?men=El tiempo promedio de cita debe ser de entre 10min y 2 hrs');
            res.end();
          }
        }else{
          res.redirect('/Home?men=El tiempo promedio de cita no es valido');
          res.end();
        }
      }else{
        res.redirect('/Home?men=La hora de salida debe ser mayor a la de entrada');
        res.end();
      }
    }else{
      res.redirect('/Home?men=Ingresa horas validas');
      res.end();
    }
  }else{
    res.redirect('/Home?men=Debes seleccionar al menos un día de trabajo');
    res.end();
  }
}

exports.editarHorario = editarHorario;
exports.registrarHorario = registrarHorario;
exports.obtenerCitas = obtenerCitas;
exports.obtenerPacientes = obtenerPacientes;
exports.obtenerPacienteById = obtenerPacienteById;
exports.agendarCita = agendarCita;
exports.obtenerHorario = obtenerHorario;
